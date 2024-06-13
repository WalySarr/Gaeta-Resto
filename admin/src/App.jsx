// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './views/Add/Add';
import Orders from './views/Orders/Orders';
import List from './views/List/List';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './views/Update/Update';

const App = () => {
    const url = 'http://localhost:4000';
    return (
        <div>
            <ToastContainer />
            <Navbar />
            <hr />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path="/update" element={<Update url={url} />} />
                    <Route path="/add" element={<Add url={url} />} />
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/orders" element={<Orders url={url} />} />
                    <Route path="/" element={<Orders url={url} />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
