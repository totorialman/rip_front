import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/userSlice";
import { api } from "../api";

const getCSRFToken = () => {
    const matches = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
    return matches ? matches[2] : null;
  };

const AppNavbar: React.FC = () => {
    const { isLoggedIn, username } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            try {
                const csrfToken = getCSRFToken();
          
                if (!csrfToken) {
                  throw new Error("CSRF token is missing");
                }
          
                await await api.rentalList.rentalListDelete({
                  withCredentials: true,
                  headers: {
                    "X-CSRFToken": csrfToken,
                  },
                });
              } catch (error) {
                console.error("Ошибка при обновлении количества:", error);
              }
              // API для удаления черновика

            // Отправляем запрос на сервер для выхода и удаления заявки черновика
            await api.logout.logoutDelete();  // Этот запрос должен удалять заявку
    
            // Отправляем запрос на сервер для удаления черновика
    
            // Обновляем состояние в Redux
            dispatch(logout());
    
            // Перезагружаем страницу
            //window.location.reload();
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Navbar.Brand as={Link} to="/" className="mx-3">
                Аренда виртуальных машин
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Главная</Nav.Link>
                    <Nav.Link as={Link} to="/machines">Конфигурации</Nav.Link>
                </Nav>
                <Nav className="d-flex align-items-center">
                    {isLoggedIn ? (
                        <>
                            <Navbar.Text className="me-3">Привет, {username}!</Navbar.Text>
                            <Nav.Link as={Link} to="/" onClick={handleLogout}>
                                Выйти
                            </Nav.Link>
                            <Nav.Link as={Link} to="/profile">Профиль</Nav.Link>
                            {/* Для авторизованных пользователей */}
                            <Nav.Link as={Link} to="/rent-list/" style={{ color: '#0D6EFD' }}>Мои заявки</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Вход</Nav.Link>
                            <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
                            {/* Для неавторизованных пользователей, просто текст */}
                            <Nav.Item style={{ color: 'gray' }}>
                                Мои заявки
                            </Nav.Item>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
