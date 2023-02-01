import axios from "axios";
import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const Course = (props) => {

    const [courseStatus, setCourseStatus] = useState('');

    const { state } = useLocation();
    const navigate = useNavigate();
    
    const { name, faculty, course_id, description } = state.course
        ? state.course
        : {};

    

    const loggedInUser = localStorage.getItem("user");


    useEffect(() => {
        if (!state) {
            navigate("/dashboard/courses");
        } else {

            if(loggedInUser) {
                const user = JSON.parse(loggedInUser);
                
                setCourseStatus(state.mode);
                user.user.enrolledCourses.every(course => {
                    if(course.course_id === course_id) {
                        console.log(course_id, course.course_id);

                        setCourseStatus("enrolled");
                        return false;
                    }

                    return true;
                });
            }

        }
    }, [state, navigate, loggedInUser, course_id]);

    


    const handleEnroll = (e) => {
        e.preventDefault();

        if (!loggedInUser) {
            navigate("/login");
        } else {
            const user = JSON.parse(loggedInUser);
            const bearerToken = "Bearer " + user.token;
            console.log(bearerToken);

            axios
                .post(`/courses/enroll/${course_id}`, {} ,{
                    headers: { Authorization: bearerToken },
                })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("enrolled");

                        user.user.enrolledCourses.push({name, course_id, faculty, description});
                        localStorage.setItem('user', JSON.stringify(user));
                    
                        setCourseStatus("enrolled");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <h1 className="mt-4">Course</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active">Course</li>
            </ol>

            <div className="p-5 mb-4 bg-light shadow-sm rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">{name}</h1>
                    <h3 className="display-8 fw-bold">{faculty}</h3>
                    <h5 className="display-12 fw-bold">
                        Course ID: {course_id}
                    </h5>
                    <p className="col-md-8 fs-4">{description}</p>
                    {/* <button className="btn btn-primary btn-lg" type="button">Example button</button> */}
                    <div className="btn-bar">
                        {(courseStatus === "catalog" || courseStatus === "search")  && (
                            <button
                                className="btn btn-success btn-lg"
                                type="button"
                                onClick={handleEnroll}
                            >
                                Enroll
                            </button>
                        )}
                        {courseStatus === "enrolled" && (
                            <button
                                className="btn btn-danger btn-lg"
                                type="button"
                            >
                                Drop
                            </button>
                        )}
                        {courseStatus === "instructor" && (
                            <button
                                className="btn btn-success btn-lg"
                                type="button"
                            >
                                Mark as Completed
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
