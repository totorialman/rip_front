import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useFilter } from '../context/FilterContext';  
import PriceFilter from '../components/PriceFilter';
import MachineCard from '../components/MachineCard';
import { VMData, fetchVMListFromApi } from '../services/api';
import '../App.css';

const MachinesPage: React.FC = () => {
    const { state } = useFilter(); 
    const { maxPrice } = state; 
    const [machines, setMachines] = useState<VMData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 

    useEffect(() => {
        const loadMachines = async () => {
            setIsLoading(true); 
            try {
                const data = await fetchVMListFromApi(maxPrice);
                if (Array.isArray(data)) {
                    setMachines(data); 
                } else {
                    console.error('Ошибка: получены некорректные данные', data);
                }
            } catch (error) {
                console.error('Ошибка при загрузке машин:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadMachines();
    }, [maxPrice]); 

    return (
        <Container>
            <h2>Конфигурации виртуальных машин</h2>
            <Row className="g-3">
                <Col md={4}>
                    <PriceFilter />
                </Col>
            </Row>
            <Row className="machine-grid">
                {isLoading ? ( // Показываем спиннер, если данные загружаются
                    <div className="d-flex justify-content-center my-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                    </div>
                ) : machines.length > 0 ? (
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
