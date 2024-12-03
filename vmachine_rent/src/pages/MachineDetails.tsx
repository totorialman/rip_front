import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';
import { VMData, fetchVMByIdFromApi } from '../services/api';
import image from "../services/DefaultImage.png";
import '../App.css';

const VMDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [vm, setVm] = useState<VMData | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const fetchVM = async () => {
            if (id) {
                const data = await fetchVMByIdFromApi(parseInt(id));
                setVm(data || null);
                setLoading(false); 
            }
        };
        fetchVM();
    }, [id]);

    if (loading) {
        return <Spinner animation="border" />; 
    }

    if (!vm) {
        return <p>Виртуальная машина не найдена.</p>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '40rem' }}> {}
                <Card.Img variant="top" src={vm.url || image} />
                <Card.Body>
                    <Card.Title>{vm.name}</Card.Title>
                    <Card.Text>
                        <strong>Характеристики:</strong>
                        <ul>
                            <li>Ядра (vCPU): {vm.vcpu}</li>
                            <li>RAM: {vm.ram} ГБ</li>
                            <li>SSD: {vm.ssd} ГБ</li>
                            <li>Описание: {vm.description_tech}</li>
                        </ul>
                    </Card.Text>
                    <Card.Text>
                        <strong>Стоимость: {vm.price} ₽/мес</strong>
                    </Card.Text>
                    <Button variant="primary">Арендовать</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default VMDetailPage;
