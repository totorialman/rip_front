import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import { BreadCrumbs } from './components/Breadcrumbs';
import HomePage from './pages/HomePage';
import MachinesPage from './pages/MachinesPage';
import MachineDetails from './pages/MachineDetails';

const App: React.FC = () => {
    return (
        <Router basename="/rip_front">
            <AppNavbar />
            <MainRoutes />
        </Router>
    );
};

const MainRoutes: React.FC = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(Boolean);

    const crumbs = paths.map((path, index) => {
        let label = path.charAt(0).toUpperCase() + path.slice(1);
        if (path === 'machines') {
            label = 'Виртуальные машины'; 
        } else if (path === 'home') {
            label = 'Главная'; 
        }

        return {
            label, 
            path: `/${paths.slice(0, index + 1).join('/')}`, 
        };
    });

    return (
        <div>
            <BreadCrumbs crumbs={crumbs} /> 
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/machines" element={<MachinesPage />} />
                <Route path="/machines/:id" element={<MachineDetails />} />
            </Routes>
        </div>
    );
};

export default App;
