import React, { useEffect, useState } from "react";
import "./recruiting.css";
import dataService from "../services/dataService";

function Recruiting() {
    const [allGames, setAllGames] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);

    async function loadPost() {
        const gms = await dataService.getGames();
        setAllGames(gms);

        const allPlayers = await dataService.getUsers();
        setAllPlayers(allPlayers);
    }

    // when the page loads
    useEffect(function () {
        loadPost();
    }, []);

    return (
        <div className="recruiting page">
        <div className="post-list">
            {allGames.map((game) => (
            <div className="game-section">
                <h2>{game.name}</h2>
                <img src={game.image} alt="" />
                <h5>LFT Users</h5>
                {/* get the users for that game */}
                <div className="player-section">
                {allPlayers
                    .filter((p) => p.games?.includes(game.id))
                    .map((player) => (
                    <div className="player">
                        <label>{player.username}</label>
                        <label>{player.region}</label>
                        <label>{player.rank}</label>
                    </div>
                    ))}
                </div>

                {/* render the teams */}
            </div>
            ))}
        </div>
        </div>
    );
}

export default Recruiting;
