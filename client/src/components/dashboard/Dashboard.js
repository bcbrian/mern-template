import React, { useContext, useState, useEffect } from "react";
import { Box, Button } from "grommet";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../auth/auth";

export default function Dashboard({ history }) {
  const { user, logoutUser } = useContext(AuthContext);

  const [games, setGames] = useState({
    my: [],
    open: []
  });
  useEffect(() => {
    setTimeout(() => {
      fetch(`/api/v1/games/my-games/${user.id}`)
        .then(res => res.json())
        .then(res1 => {
          fetch(`/api/v1/games/open-games`)
            .then(res => res.json())
            .then(res2 => {
              console.log(res1);
              console.log(res2);
              setGames({
                my: res1.games,
                open: res2.games
              });
            });
        });
    }, 1000);
  }, []);

  console.log("wwwtttfff");
  return (
    <>
      <div
        style={{
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <Box direction="row" align="center" justify="center">
          <div>
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p>
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <Button
              onClick={e => {
                e.preventDefault();
                logoutUser();
              }}
              label="Logout"
            />
          </div>
        </Box>
      </div>
      <Box align="center" justify="center">
        <Box align="center" justify="center">
          <Button
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
            label="Start Game"
          />
        </Box>
        <div>
          <h1>MY GAMES</h1>
          <div>
            {games.my.map(game => (
              <div>
                <Link to={`/games/${game._id}`}>
                  {game._id} => {game.game}
                </Link>
              </div>
            ))}
          </div>
          <h1>OPEN GAMES</h1>
          <div>
            {games.open.map(game => (
              <div>
                <span to={`/games/${game._id}`}>
                  {game._id} => {game.game}
                </span>
                <Button
                  onClick={() => {
                    axios({
                      url: `/api/v1/games/join/${game._id}`,
                      method: "PUT",
                      data: {
                        ...game,
                        o: user.id
                      }
                    }).then(res => {
                      console.log(res);
                      history.push(`/games/${game._id}`);
                    });
                  }}
                  label="JOIN"
                />
              </div>
            ))}
          </div>
        </div>
      </Box>
    </>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
