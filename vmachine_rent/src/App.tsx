import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux"; // Импортируем Provider
import store from "./store/store"; // Импортируем созданный Redux Store

import AppNavbar from "./components/Navbar";
import { BreadCrumbs } from "./components/Breadcrumbs";
import HomePage from "./pages/HomePage";
import MachinesPage from "./pages/MachinesPage";
import MachineDetails from "./pages/MachineDetails";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

import LoginPage from "./pages/LoginPage";
import { dest_root } from "../target_config";
import CartPage from "./pages/CartPage";

const App: React.FC = () => {
  return (
    <Provider store={store}> {/* Оборачиваем приложение в Provider */}
      <Router basename={dest_root}>
        <AppNavbar />
        <MainRoutes />
      </Router>
    </Provider>
  );
};

const MainRoutes: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const crumbs = paths.map((path, index) => {
    let label = path.charAt(0).toUpperCase() + path.slice(1);
    if (path === "machines") {
      label = "Виртуальные машины";
    } else if (path === "home") {
      label = "Главная";
    } else if (path === "login") {
      label = "Вход";
    } else if (path === "register") {
      label = "Регистрация";
    }
    else if (path === "profile") {
      label = "Личный кабинет";
    }
    else if (path === "rent-list") {
      label = "Заявки";
    }

    return {
      label,
      path: `/${paths.slice(0, index + 1).join("/")}`,
    };
  });

  return (
    <div>
      <BreadCrumbs crumbs={crumbs} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/machines/" element={<MachinesPage />} />
        <Route path="/machines/:id/" element={<MachineDetails />} />
        <Route path="/register/" element={<RegisterPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/rent-list/" element={<CartPage />} />
        
      </Routes>
    </div>
  );
};

export default App;
