import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useFilter } from '../context/FilterContext';  // Импортируем хук
import PriceFilter from '../components/PriceFilter';
import MachineCard from '../components/MachineCard';
import { VMData, fetchVMListFromApi } from '../services/api';
import '../App.css';

const MachinesPage: React.FC = () => {
    const { state} = useFilter(); // Получаем состояние и dispatch из контекста
    const { maxPrice } = state; // Достаем maxPrice из состояния
    const [machines, setMachines] = useState<VMData[]>([]);

    useEffect(() => {
        const loadMachines = async () => {
            try {
                const data = await fetchVMListFromApi(maxPrice);
                if (Array.isArray(data)) {
                    setMachines(data); 
                } else {
                    console.error('Ошибка: получены некорректные данные', data);
                }
            } catch (error) {
                console.error('Ошибка при загрузке машин:', error);
            }
        };
        loadMachines();
    }, [maxPrice]); // Перезапуск загрузки при изменении maxPrice

    return (
        <Container>
            <h2>Конфигурации виртуальных машин</h2>
            <Row className="g-3">
                <Col md={4}>
                    <PriceFilter />
                </Col>
            </Row>
            <Row className="machine-grid">
                {machines.length > 0 ? (
                    machines.map(vm => (
                        <Col key={vm.id} xs={12} sm={6} lg={4} className="my-3">
                            <MachineCard vm={vm} />
                        </Col>
                    ))
                ) : (
                    <p>Нет доступных виртуальных машин для отображения.</p>
                )}
            </Row>
        </Container>
    );
};

export default MachinesPage;
