import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const HomePage: React.FC = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Добро пожаловать на сайт по аренде виртуальных машин!</h1>
        <p>На этой платформе вы можете выбрать конфигурацию виртуальной машины, подходящую для ваших нужд.</p>
        
        <Link to="/machines">
            <Button variant="primary" size="lg" style={{ marginTop: '20px' }}>
                Перейти к выбору машин
            </Button>
        </Link>
    </div>
);

export default HomePage;
