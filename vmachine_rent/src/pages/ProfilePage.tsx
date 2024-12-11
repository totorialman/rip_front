import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { api } from "../api";
import { loginUser } from "../store/userSlice"; 

const ProfilePage: React.FC = () => {
    const username = useSelector((state: RootState) => state.user.username); 
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null); 
        setError(null); 

        if (newPassword !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        if (!username) {
            setError("Имя пользователя не найдено");
            return;
        }

        try {
            const csrfToken = document.cookie
                .split("; ")
                .find((row) => row.startsWith("csrftoken="))
                ?.split("=")[1];

            if (!csrfToken) {
                throw new Error("CSRF-токен отсутствует.");
            }

            const response = await api.register.registerUpdate(username, { password: newPassword }, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
                }
            });

            if (response.status === 200) {
                setSuccess("Пароль успешно обновлен");
                setError(null);

                (dispatch as any)(loginUser({ username, password: newPassword }))
                    .then(() => {
                        navigate("/"); 
                    })
                    .catch(() => {
                        setFeedback({ type: "error", message: "Ошибка авторизации после обновления пароля." });
                    });

                navigate("/profile");
            } else {
                throw new Error("Ошибка при обновлении пароля.");
            }
        } catch (err) {
            if (err instanceof Error) {
                setFeedback({ type: "error", message: `Не удалось обновить пароль: ${err.message}` });
            } else {
                setFeedback({ type: "error", message: "Не удалось обновить пароль" });
            }
            setSuccess(null);
        }
    };

    return (
        <div className="container">
            <h2>Личный кабинет</h2>
            <Form onSubmit={handleSubmit}>
                {feedback && <Alert variant={feedback.type === "success" ? "success" : "danger"}>{feedback.message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form.Group controlId="newPassword">
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Подтвердите новый пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Подтвердите новый пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Обновить пароль
                </Button>
            </Form>
        </div>
    );
};

export default ProfilePage;
