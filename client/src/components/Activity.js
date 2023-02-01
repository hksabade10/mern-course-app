import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Activity = () => {

    const [created, setCreated] = useState();
    const [updated, setUpdated] = useState();
    const navigate = useNavigate();

    const getDate = (input) => {
        let date = new Date(input);
        let options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
        };
        let properDate = date.toLocaleDateString("en-US", options);
        return properDate;
    }

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if(!loggedInUser) {
            navigate('/login');
        } else {
            const user = loggedInUser.user;
            setCreated(getDate(user.createdAt));
            setUpdated(getDate(user.updatedAt));
        }
    }, [navigate]);

    return (
        <div>
            <h1 className="mt-4">Activity</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active">Activity</li>
            </ol>
            
            <h5 className="mb-0 mt-5">Activity Logs</h5>
            <p>Last activities with your account.</p>
            <div className="list-group mb-3 shadow">
                <div className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-2">Last Account Update</strong>
                            <p className="text-muted mb-0">{updated}</p>
                        </div>
                    </div>
                </div>
                <div className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-2">Account Created</strong>
                            <span className="badge badge-pill badge-success">Enabled</span>
                            <p className="text-muted mb-0">{created}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Activity;