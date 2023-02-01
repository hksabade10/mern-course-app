import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";

import Card from "./Card";

const Courses = (props) => {
    const [courseData, setCourseData] = useState([]);
    
    const navigate = useNavigate();

    const { state } = useLocation();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");

        if (!loggedInUser) {
            navigate('/login');
        }
        else {
            const user = JSON.parse(loggedInUser);
            const bearerToken = "Bearer " + user.token;

            console.log(props.mode);

            const path =
                props.mode === "enrolled"
                    ? "enrolled"
                    : props.mode === "instructor"
                    ? "my"
                    : "";

            let query;
            
            if(state)
                query = {search: state.search};

            axios
                .get(`/courses/${path}`, {   
                headers: { Authorization: bearerToken },
                params: query
                })
                .then((res) => {
                    if (res.status === 200) {
                        setCourseData(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [navigate, props.mode, state]);

    
    return (
        <div>
            <h1 className="mt-4">Courses</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">Dashboard</li>
                {props.mode === "catalog" ? (
                    <li className="breadcrumb-item active">Courses</li>
                ) : (
                    <>
                        <li className="breadcrumb-item">Courses</li>
                        {props.mode === "enrolled" ? (
                            <li className="breadcrumb-item active">Enrolled</li>
                        ) : (
                            props.mode === "instructor" ? (
                            <li className="breadcrumb-item active">Instructing</li>
                            ) : (
                                <li className="breadcrumb-item active">Search Result</li>
                            )
                        )}
                    </>
                )}
            </ol>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                {courseData.map((course, i) => (
                    <Card courseData={course} mode={props.mode} key={i} />
                ))}
            </div>
        </div>
    );
};

export default Courses;
