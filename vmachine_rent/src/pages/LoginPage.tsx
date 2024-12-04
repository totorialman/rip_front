import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { api } from "../api";


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);

        try {
            const response = await api.login.loginCreate(
                { username, password },
                { credentials: "include" } // Указывает работу с куками
            );

            if (response.status === 200) {
                const data: any = response.data;

                if (data === "{'status': 'ok'}") {
                    setFeedback({ type: "success", message: "Успешная авторизация!" });

                    // Обновляем состояние Redux
                    dispatch(loginSuccess(username));

                    // Перенаправление на главную страницу
                    navigate("/");
                } else {
                    throw new Error("Некорректный ответ сервера.");
                }
            } else {
                throw new Error("Ошибка авторизации.");
            }
        } catch (err) {
            console.error("Ошибка авторизации:", err);
            setFeedback({ type: "error", message: "Неверные данные или сервер недоступен." });
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2>Авторизация</h2>
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

                        {feedback && (
                            <Alert variant={feedback.type === "success" ? "success" : "danger"}>{feedback.message}</Alert>
                        )}

                        <Button variant="primary" type="submit">
                            Войти
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
