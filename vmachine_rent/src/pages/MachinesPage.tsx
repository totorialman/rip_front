import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import PriceFilter from '../components/PriceFilter';
import MachineCard from '../components/MachineCard';
import { RootState } from '../store';
import { VMData, fetchVMListFromApi } from '../services/api';
import '../App.css';

const MachinesPage: React.FC = () => {
    const maxPrice = useSelector((state: RootState) => state.filter.maxPrice); // maxPrice из Redux
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
    }, [maxPrice]); // Перезагружаем данные при изменении maxPrice

    return (
        <Container className="custom-container">
            <h2>Конфигурации виртуальных машин</h2>
            <Row>
                <Col md={4}>
                    <PriceFilter />
                </Col>
            </Row>
            <Row>
                {machines.length > 0 ? (
                    machines.map(vm => (
                        <Col key={vm.id} md={4} className="my-3 px-3">
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


