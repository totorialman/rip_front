import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { VMData } from '../services/api';
import { Link } from 'react-router-dom';
import image from "../services/DefaultImage.png";
import '../styles.css';

interface MachineCardProps {
    vm: VMData;
}

const MachineCard: React.FC<MachineCardProps> = ({ vm }) => (
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
                <Button variant="primary" >Подробнее</Button>
            </Link>
            <Button variant="primary" className="flex-grow-1">Добавить</Button> 
        </div>
    </Card.Body>
</Card>

);

export default MachineCard;
