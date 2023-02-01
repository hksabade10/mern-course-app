import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const [isEditable, setIsEditable] = useState(false);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [age, setAge] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            navigate("/login");
        }

        const user = JSON.parse(loggedInUser);

        setUsername(user.user.username);

        const [email] = user.user.email.split("@");
        setEmail(email);
        setCity(user.user.city);
        setState(user.user.state);
        setAge(user.user.age);
        const [firstname, lastname] = user.user.name.split(" ");
        setFirstname(firstname);
        setLastname(lastname);
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const loggedInUser = localStorage.getItem("user");

        if (!loggedInUser) {
            navigate("/login");
        } else {
            const user = JSON.parse(loggedInUser);
            const bearerToken = "Bearer " + user.token;

            const name = firstname + " " + lastname;

            const data = { name, city, state, age };
            if (password !== "") data.password = password;

            axios
                .patch("/users/me", data, {
                    headers: { Authorization: bearerToken },
                })
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify({
                                user: res.data,
                                token: user.token,
                            })
                        );
                    }
                })
                .catch((err) => {
                    console.log(err.response.status);
                    if (err.response.status === 401) navigate("/login");
                });

            setIsEditable(false);
        }
    };

    const handleEdit = (e) => {
        e.preventDefault();

        setIsEditable(true);
    };

    return (
        <div>
            <h1 className="mt-4">Profile</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active">Profile</li>
            </ol>
            <div className="container-xl px-4 mt-4">
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4">
                        {/* <!-- Profile picture card--> */}
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                {/* <!-- Profile picture image--> */}
                                <img
                                    className="img-account-profile rounded-circle mb-2"
                                    src="http://bootdey.com/img/Content/avatar/avatar1.png"
                                    alt=""
                                />
                                {/* <!-- Profile picture help block--> */}
                                <div className="small font-italic text-muted mb-4">
                                    JPG or PNG no larger than 5 MB
                                </div>
                                {/* <!-- Profile picture upload button--> */}
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Upload new image
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        {/* <!-- Account details card--> */}
                        <div className="card mb-4">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputFirstName"
                                            >
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputFirstName"
                                                placeholder="First Name"
                                                value={firstname}
                                                onChange={({ target }) =>
                                                    setFirstname(target.value)
                                                }
                                                disabled={!isEditable}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputLastName"
                                            >
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputLastName"
                                                placeholder="Last Name"
                                                value={lastname}
                                                onChange={({ target }) =>
                                                    setLastname(target.value)
                                                }
                                                disabled={!isEditable}
                                            />
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputUsername"
                                            >
                                                Username
                                            </label>
                                            <div className="input-group has-validation">
                                                <span className="input-group-text">
                                                    @
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputUsername"
                                                    placeholder="Username"
                                                    value={username}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputPassword"
                                            >
                                                Password
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={({ target }) =>
                                                        setPassword(
                                                            target.value
                                                        )
                                                    }
                                                    disabled={!isEditable}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row gx-3 mb-3">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputEmail"
                                        >
                                            Email
                                        </label>
                                        <div className="col-md-6 input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail"
                                                placeholder="Email ID"
                                                value={email}
                                                disabled={true}
                                            />
                                            <span className="input-group-text">
                                                @cms.ac.in
                                            </span>
                                        </div>
                                    </div>

                                    {/* <!-- Form Row        --> */}
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputCity"
                                            >
                                                City
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputCity"
                                                type="text"
                                                placeholder="Enter your city"
                                                value={city}
                                                onChange={({ target }) =>
                                                    setCity(target.value)
                                                }
                                                disabled={!isEditable}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputState"
                                            >
                                                State
                                            </label>
                                            <select
                                                className="form-select"
                                                id="inputState"
                                                value={state}
                                                onChange={({ target }) =>
                                                    setState(target.value)
                                                }
                                                disabled={!isEditable}
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
                                                <option value="Assam">
                                                    Assam
                                                </option>
                                                <option value="Bihar">
                                                    Bihar
                                                </option>
                                                <option value="Chhattisgarh">
                                                    Chhattisgarh
                                                </option>
                                                <option value="Goa">Goa</option>
                                                <option value="Gujarat">
                                                    Gujarat
                                                </option>
                                                <option value="Haryana">
                                                    Haryana
                                                </option>
                                                <option value="Himachal Pradesh">
                                                    Himachal Pradesh
                                                </option>
                                                <option value="Jharkhand">
                                                    Jharkhand
                                                </option>
                                                <option value="Karnataka">
                                                    Karnataka
                                                </option>
                                                <option value="Kerala">
                                                    Kerala
                                                </option>
                                                <option value="Madhya Pradesh">
                                                    Madhya Pradesh
                                                </option>
                                                <option value="Maharashtra">
                                                    Maharashtra
                                                </option>
                                                <option value="Manipur">
                                                    Manipur
                                                </option>
                                                <option value="Meghalaya">
                                                    Meghalaya
                                                </option>
                                                <option value="Mizoram">
                                                    Mizoram
                                                </option>
                                                <option value="Nagaland">
                                                    Nagaland
                                                </option>
                                                <option value="Odisha">
                                                    Odisha
                                                </option>
                                                <option value="Punjab">
                                                    Punjab
                                                </option>
                                                <option value="Rajasthan">
                                                    Rajasthan
                                                </option>
                                                <option value="Sikkim">
                                                    Sikkim
                                                </option>
                                                <option value="Tamil Nadu">
                                                    Tamil Nadu
                                                </option>
                                                <option value="Telangana">
                                                    Telangana
                                                </option>
                                                <option value="Tripura">
                                                    Tripura
                                                </option>
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
                                    </div>

                                    <div className="row gx-3 mb-3">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputAge"
                                        >
                                            Age
                                        </label>
                                        <div className="col-md-4">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="inputAge"
                                                placeholder="Age"
                                                value={age}
                                                onChange={({ target }) =>
                                                    setAge(target.value)
                                                }
                                                disabled={!isEditable}
                                            />
                                        </div>
                                    </div>

                                    {isEditable && (
                                        <p className="small mb-1 text-danger">
                                            Leave password field blank if you
                                            don't want to change it.
                                        </p>
                                    )}

                                    {/* <!-- Save changes button--> */}
                                    {isEditable && (
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            Save Changes
                                        </button>
                                    )}

                                    {/* <!-- Edit button--> */}
                                    {!isEditable && (
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={handleEdit}
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
