import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const location = useLocation();

    const handleDashboard = (e) => {
        e.preventDefault();

        if(location.pathname !== "/dashboard/courses")
        navigate("/dashboard");
    };

    const handleProfile = (e) => {
        e.preventDefault();

        if(location.pathname !== "/dashboard/profile")
        navigate("/dashboard/profile");
    };

    const handleActivity = (e) => {
        e.preventDefault();

        if(location.pathname !== "/dashboard/activity")
        navigate("/dashboard/activity");
    };

    const handleEnrolled = (e) => {
        e.preventDefault();

        if(location.pathname !== "/dashboard/courses/enrolled")
        navigate("/dashboard/courses/enrolled");
    };

    const handleInstructing = (e) => {
        e.preventDefault();

        if(location.pathname !== "/dashboard/courses/my")
        navigate("/dashboard/courses/my");
    };

    const handleCatalog = (e) => {
        e.preventDefault();

        if(location.pathname !== "/dashboard/courses")
        navigate("/dashboard/courses");
    };

    const handleCreateCourse = (e) => {
        e.preventDefault();

        if(location.pathname !== "/dashboard/courses/create")
        navigate("/dashboard/courses/create");
    }

    return (
        <div id="layoutSidenav_nav">
            <nav
                className="sb-sidenav accordion sb-sidenav-dark"
                id="sidenavAccordion"
            >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <a
                            className="nav-link"
                            href="/dashboard"
                            onClick={handleDashboard}
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Dashboard
                        </a>

                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseLayouts"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="far fa-address-card"></i>
                            </div>
                            Profile
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapseLayouts"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav className="sb-sidenav-menu-nested nav">
                                <a
                                    className="nav-link"
                                    href="/dashboard/profile"
                                    onClick={handleProfile}
                                >
                                    Settings
                                </a>
                                <a
                                    className="nav-link"
                                    href="/dashboard/activity"
                                    onClick={handleActivity}
                                >
                                    Activity
                                </a>
                            </nav>
                        </div>
                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsePages"
                        >
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-book-open"></i>
                            </div>
                            Courses
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapsePages"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav
                                className="sb-sidenav-menu-nested nav accordion"
                                id="sidenavAccordionPages"
                            >
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#pagesCollapseAuth"
                                >
                                    My Courses
                                    <div className="sb-sidenav-collapse-arrow">
                                        <i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div
                                    className="collapse"
                                    id="pagesCollapseAuth"
                                    data-bs-parent="#sidenavAccordionPages"
                                >
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <a
                                            className="nav-link"
                                            href="/dashboard/courses/enrolled"
                                            onClick={handleEnrolled}
                                        >
                                            Enrolled
                                        </a>
                                        <a
                                            className="nav-link"
                                            href="/dashboard/courses/my"
                                            onClick={handleInstructing}
                                        >
                                            Instructing
                                        </a>
                                    </nav>
                                </div>

                                <a
                                    className="nav-link"
                                    href="/dashboard/courses/catalog"
                                    onClick={handleCatalog}
                                >
                                    Catalog
                                </a>
                                <a
                                    className="nav-link"
                                    href="/dashboard/courses/create"
                                    onClick={handleCreateCourse}
                                >
                                    Create Course
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    {user && user.user.name + " (" + user.user.username + ")"}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
