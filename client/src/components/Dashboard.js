import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Dashboard = () => {
    const [isActive, setActive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            navigate("/login");
        }
    }, [navigate]);

    const sidebarToggle = () => {
        setActive(isActive ? false : true);
    };

    return (
        <div className={`sb-nav-fixed ${isActive && "sb-sidenav-toggled"}`}>
            <Navbar onToggle={sidebarToggle} />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <Outlet />
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
