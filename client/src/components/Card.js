import React from "react";

import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const title = props.courseData.name;
    const faculty = props.courseData.faculty;

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/dashboard/course", {
            state: { course: props.courseData, mode: props.mode }
        });
    };

    const randomBetween = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);

    return (
        <div className="col">
            <div
                className="card text-bg mb-4 bg-light shadow-sm"
                style={{ height: "20rem", width: "18rem" }}
            >
                <div
                    className="bg-cover-img-div"
                    style={{ background: `rgb(${r},${g},${b})` }}
                >
                    <img
                        className="card-img-top bg-cover-img"
                        alt="..."
                        width="80"
                        height="140"
                        src="https://img.freepik.com/free-vector/seamless-chaotic-squares-mosaic-pattern_1409-1063.jpg?w=1380&t=st=1675172560~exp=1675173160~hmac=f3e7dbd8047a52311587436baa732596927c51edf3eee0b4c5abf6db04aef599"
                    />
                </div>
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <h6>By {faculty}</h6>
                    <button className="btn btn-primary" onClick={handleClick}>
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
