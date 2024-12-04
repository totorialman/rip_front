import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { api } from '../api'

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await api.user.userCreate({ username, password });
            setSuccess(true);
            setUsername("");
            setPassword("");
        } catch (err) {
            setError("Ошибка регистрации. Проверьте данные или повторите попытку.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2>Регистрация</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя пользователя"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">Регистрация прошла успешно!</Alert>}
                        <Button variant="primary" type="submit">
                            Зарегистрироваться
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
