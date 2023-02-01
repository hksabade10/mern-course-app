import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [course_id, setCourseId] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const loggedInUser = localStorage.getItem("user");

        if (!loggedInUser) {
            navigate("/login");
        }

        const user = JSON.parse(loggedInUser);

        const bearerToken = "Bearer " + user.token;

        axios
            .post(
                "/courses/create",
                { name, course_id, description },
                { headers: { Authorization: bearerToken } }
            )
            .then((res) => {
                if (res.status === 201) {
                    navigate("/dashboard/course", {
                        state: {
                            course: {
                                name,
                                course_id,
                                description,
                                faculty: user.user.name,
                            },
                            mode: "instructor",
                        },
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div>
                <h1 className="mt-4">Create Course</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item">Courses</li>
                    <li className="breadcrumb-item active">
                        Create New Course
                    </li>
                </ol>
            </div>

            <div className="col-xl-8">
                <div className="card mb-4">
                    <div className="card-header">New Course Details</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="courseId"
                                    >
                                        Course ID
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="courseId"
                                        placeholder="Course ID"
                                        value={course_id}
                                        onChange={({ target }) =>
                                            setCourseId(target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="nameInput"
                                    >
                                        Course Name
                                    </label>
                                    <input
                                        type="test"
                                        className="form-control"
                                        id="nameInput"
                                        placeholder="Enter a name for the course..."
                                        value={name}
                                        onChange={({ target }) =>
                                            setName(target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="descriptionTextarea"
                                    >
                                        Course Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="descriptionTextarea"
                                        rows="3"
                                        placeholder="Describe the course..."
                                        value={description}
                                        onChange={({ target }) =>
                                            setDescription(target.value)
                                        }
                                    ></textarea>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
