import React from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error404 from "./components/404";

import Courses from "./components/Courses";
import Course from "./components/Course";
import Profile from "./components/Profile";
import Activity from "./components/Activity";
import CreateCourse from "./components/CreateCourse";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Navigate to="/dashboard" />}
                    />
                    <Route exact path="/dashboard" element={<Dashboard />}>
                        <Route
                            index
                            element={<Navigate to="/dashboard/courses" />}
                        />
                        <Route
                            path="courses"
                            element={<Courses mode="catalog" />}
                        />
                        <Route
                            path="courses/catalog"
                            element={<Courses mode="catalog" />}
                        />
                        <Route
                            path="courses/enrolled"
                            element={<Courses mode="enrolled" />}
                        />
                        <Route
                            path="courses/my"
                            element={<Courses mode="instructor" />}
                        />
                        <Route
                            path="courses/search"
                            element={<Courses mode="search" />}
                        />
                        <Route
                            path="courses/create"
                            element={<CreateCourse />}
                        />
                        <Route path="course" element={<Course />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="activity" element={<Activity />} />
                        <Route path="*" element={<Error404 />} />
                    </Route>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
