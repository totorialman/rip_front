import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { VMData, fetchVMByIdFromApi } from '../services/api';

const VMDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [vm, setVm] = useState<VMData | null>(null);

    useEffect(() => {
        const fetchVM = async () => {
            if (id) {
                const data = await fetchVMByIdFromApi(parseInt(id));
                setVm(data || null);
            }
        };
        fetchVM();
    }, [id]);

    if (!vm) {
        return <p>Виртуальная машина не найдена.</p>;
    }

    return (
        <Card>
            <Card.Img variant="top" src={vm.url || 'default-image-url.png'} />
            <Card.Body>
                <Card.Title>{vm.name}</Card.Title>
                <Card.Text>
                    <strong>Характеристики:</strong>
                    <ul>
                        <li>Ядра (vCPU): {vm.vCPU}</li>
                        <li>RAM: {vm.RAM} ГБ</li>
                        <li>SSD: {vm.SSD} ГБ</li>
                        <li>SSD: {vm.description_tech} ГБ</li>
                    </ul>
                </Card.Text>
                <Card.Text>
                    <strong>Стоимость: {vm.price} ₽/мес</strong>
                </Card.Text>
                <Button variant="primary">Арендовать</Button>
            </Card.Body>
        </Card>
    );
};

export default VMDetailPage;
