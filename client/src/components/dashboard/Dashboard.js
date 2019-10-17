import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { AuthContext } from "../../auth/auth";

export default function Dashboard() {
  const { user, logoutUser } = useContext(AuthContext);

  const [myGames, setMyGames] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch(`/api/v1/games/my-games/${user.id}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setMyGames(res.games);
        });
    }, 1000);
  });

  return (
    <>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={e => {
                e.preventDefault();
                logoutUser();
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          onClick={e => {
            e.preventDefault();
            console.log("user", user, {
              x: user.id
            });
            fetch("/api/v1/games", {
              method: "POST",
              body: JSON.stringify({
                x: user.id
              }),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(res => res.json())
              .then(res => console.log(res));
          }}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Start Game
        </button>
        <div>
          <h1>GAMES</h1>
          <div>
            {myGames.map(game => (
              <div>
                <Link to={`/games/${game._id}`}>
                  {game._id} => {game.game}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
