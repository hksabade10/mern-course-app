import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        navigate('/dashboard/courses/search', {
            state: {search: searchText}
        });
    }

    const handleToggle = () => {
        props.onToggle();
    };

    const handleProfile = (e) => {
        e.preventDefault();

        navigate("/dashboard/profile");
    };

    const handleActivity = (e) => {
        e.preventDefault();

        navigate("/dashboard/activity");
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="/">
                <i className="fas fa-graduation-cap"></i> CMS
            </a>
            <button
                className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                id="sidebarToggle"
                href="#!"
                onClick={handleToggle}
            >
                <i className="fas fa-bars"></i>
            </button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        value={searchText}
                        onChange={({ target }) => setSearchText(target.value)}
                        placeholder="Search for..."
                    />
                    <button
                        className="btn btn-primary"
                        id="btnNavbarSearch"
                        type="button"
                        onClick={handleSearch}
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                    >
                        <i className="fas fa-user fa-fw"></i>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                        <li>
                            <a
                                className="dropdown-item"
                                href="/dashboard/profile"
                                onClick={handleProfile}
                            >
                                <i className="fas fa-sliders-h"></i>&nbsp;
                                Profile
                            </a>
                        </li>
                        <li>
                            <a
                                className="dropdown-item"
                                href="/dashboard/activity"
                                onClick={handleActivity}
                            >
                                <i className="fas fa-chart-line"></i>&nbsp;
                                Activity Log
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider dropdown-divider-dark" />
                        </li>
                        <li>
                            <a
                                className="dropdown-item"
                                href="/"
                                onClick={handleLogout}
                            >
                                <i className="fas fa-sign-out-alt"></i>&nbsp;
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
