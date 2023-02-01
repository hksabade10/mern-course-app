import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");

        if (!loggedInUser) {
            // navigate("/login");
        } else {
            
            const user = JSON.parse(loggedInUser);
            const bearerToken = "Bearer " + user.token;

            axios
                .get("/users/me", {
                    headers: { Authorization: bearerToken },
                })
                .then((res) => {
                    if (res.status === 200) {
                        navigate("/dashboard");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/users/login", {
                username,
                password,
            })
            .then((res) => {
                if (res.status === 200) {
                    setIsError(false);
                    localStorage.setItem("user", JSON.stringify(res.data));
                    navigate("/dashboard");
                }
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            });
    };

    return (
        <div>
            <div
                className="modal modal-signin position-static d-block bg-secondary py-5"
                tabIndex="-1"
                role="dialog"
                id="modalSignin"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">
                                <i className="fas fa-graduation-cap"></i> Login
                                to CMS
                            </h1>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="" onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        value={username}
                                        className="form-control rounded-3"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={({ target }) =>
                                            setUsername(target.value)
                                        }
                                    />
                                    <label htmlFor="floatingInput">
                                        Username
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        className="form-control rounded-3"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={({ target }) =>
                                            setPassword(target.value)
                                        }
                                    />
                                    <label htmlFor="floatingPassword">
                                        Password
                                    </label>
                                </div>
                                {isError && (
                                    <div
                                        className="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                    >
                                        Incorrect username or password!
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="alert"
                                        ></button>
                                    </div>
                                )}
                                <button
                                    className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                    type="submit"
                                >
                                    <i className="fas fa-sign-in-alt"></i> Login
                                </button>
                                <small className="text-muted">
                                    By clicking Sign in, you agree to the terms
                                    of use.
                                </small>
                                <hr className="my-4" />
                                <h2 className="fs-5 fw-bold mb-3">
                                    or register if not done yet
                                </h2>
                                <button
                                    className="w-100 py-2 mb-2 btn btn-lg btn-outline-dark rounded-3"
                                    type=""
                                    onClick={handleRegister}
                                >
                                    <i className="fas fa-user-plus"></i>{" "}
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
