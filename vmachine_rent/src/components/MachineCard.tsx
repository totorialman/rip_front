import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { VMData } from '../services/api';
import { Link } from 'react-router-dom';
import image from "../services/DefaultImage.png";
import '../styles.css';
import { api } from "../api";

interface MachineCardProps {
    vm: VMData;
}

const getCSRFToken = () => {
    const matches = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
    if (matches) {
        return matches[2];  // Возвращает токен
    }
    return null;  // Если токен не найден
};

const MachineCard: React.FC<MachineCardProps> = ({vm}) => {
    const handleAddToRent = async () => {
       
        try {
            const data = { service_id: vm.id, quantity: 1, is_main: false };
            const csrfToken = getCSRFToken();  // Получаем CSRF токен
            
        if (!csrfToken) {
            throw new Error("CSRF token is missing");
        }

        // Отправляем запрос с CSRF токеном и куки
        await api.rentList.rentListCreate(data, {
            withCredentials: true,  // Обязательно для отправки cookies
            headers: {
                'X-CSRFToken': csrfToken  // Отправляем CSRF токен
            }
        });
            
        } catch (error) {
            console.error('Ошибка при добавлении в корзину:', error);
            
        }
    };

    return (
        <Card className="h-100 d-flex flex-column">
            <Card.Img variant="top" src={vm.url || image} />
            <Card.Body className="d-flex flex-column">
                <Card.Text>
                    {vm.description} ГБ SSD<br /><br />
                    <Card.Text className="d-flex justify-content-between align-items-center">
                        <span><b>{vm.vcpu} vCPU · {vm.ram} RAM · {vm.ssd} SSD</b></span>
                    </Card.Text>
                    <Card.Text className="text-end mt-2 fs-5">
                        <b>{vm.price} ₽/мес</b>
                    </Card.Text>
                </Card.Text>
                <div className="d-flex mt-auto gap-2"> 
                    <Link to={`/machines/${vm.id}`} className="flex-grow-2"> 
                        <Button variant="primary" className="btn-primary2">Подробнее</Button>
                    </Link>
                    <Button 
                        variant="primary" 
                        className="btn-primary2 flex-grow-1"
                        onClick={handleAddToRent} // Вызов обработчика
                    >
                        Добавить
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MachineCard;
