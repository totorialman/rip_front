import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar: React.FC = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Аренда виртуальных машин</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Главная</Nav.Link>
                <Nav.Link as={Link} to="/machines">Конфигурации</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default AppNavbar;
