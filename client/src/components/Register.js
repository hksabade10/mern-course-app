import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [age, setAge] = useState();

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        navigate("/login");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const name = firstname + " " + lastname;
        const emailId = email + "@cms.ac.in";
        await axios
            .post("/users/signup", {
                name,
                username,
                password,
                email: emailId,
                city,
                state,
                age,
            })
            .then((res) => {
                if (res.status === 201) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    navigate("/");
                }
            });
    };

    return (
        <div>
            <div
                className="modal modal-signin position-static d-block bg-secondary py-5"
                tabindex="-1"
                role="dialog"
                id="modalSignin"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">
                                <i className="fas fa-graduation-cap"></i>{" "}
                                Register to CMS
                            </h1>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form
                                className="row g-3 needs-validation"
                                novalidate
                                onSubmit={handleRegister}
                            >
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={firstname}
                                        onChange={({ target }) =>
                                            setFirstname(target.value)
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={lastname}
                                        onChange={({ target }) =>
                                            setLastname(target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">
                                            @
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            value={username}
                                            onChange={({ target }) =>
                                                setUsername(target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={({ target }) =>
                                                setPassword(target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email ID"
                                        value={email}
                                        onChange={({ target }) =>
                                            setEmail(target.value)
                                        }
                                    />
                                    <span className="input-group-text">
                                        @cms.ac.in
                                    </span>
                                </div>

                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="City"
                                        value={city}
                                        onChange={({ target }) =>
                                            setCity(target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-6">
                                    <select
                                        className="form-select"
                                        defaultValue={""}
                                        onChange={({ target }) =>
                                            setState(target.value)
                                        }
                                        required
                                    >
                                        <option disabled value="">
                                            Select State
                                        </option>
                                        <option value="Andhra Pradesh">
                                            Andhra Pradesh
                                        </option>
                                        <option value="Arunachal Pradesh">
                                            Arunachal Pradesh
                                        </option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chhattisgarh">
                                            Chhattisgarh
                                        </option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">
                                            Himachal Pradesh
                                        </option>
                                        <option value="Jharkhand">
                                            Jharkhand
                                        </option>
                                        <option value="Karnataka">
                                            Karnataka
                                        </option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">
                                            Madhya Pradesh
                                        </option>
                                        <option value="Maharashtra">
                                            Maharashtra
                                        </option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">
                                            Meghalaya
                                        </option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">
                                            Nagaland
                                        </option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">
                                            Rajasthan
                                        </option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">
                                            Tamil Nadu
                                        </option>
                                        <option value="Telangana">
                                            Telangana
                                        </option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttarakhand">
                                            Uttarakhand
                                        </option>
                                        <option value="Uttar Pradesh">
                                            Uttar Pradesh
                                        </option>
                                        <option value="West Bengal">
                                            West Bengal
                                        </option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Age"
                                        value={age}
                                        onChange={({ target }) =>
                                            setAge(target.value)
                                        }
                                    />
                                </div>
                                <small className="text-muted">
                                    By clicking Register, you agree to the terms
                                    of use.
                                </small>
                                <div className="col-6">
                                    <button
                                        className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                        type="submit"
                                    >
                                        <i className="fas fa-user-plus"></i>
                                        &nbsp; Register
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        className="w-100 py-2 mb-2 btn btn-lg btn-outline-dark rounded-3"
                                        type="button"
                                        onClick={handleLogin}
                                    >
                                        <i className="fas fa-sign-in-alt"></i>
                                        &nbsp; Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
