import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home page">
        <img src="/images/home-banner.png" alt="banner" />

        <div className="card-container">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">Find the players you need</h5>
                <p className="card-text"></p>
                <Link to="/recruiting" className="btn btn-primary">
                Recruiting
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Home;