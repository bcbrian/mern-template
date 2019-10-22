import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function getGame(gameId, cb) {
  fetch(`/api/v1/games/${gameId}`)
    .then(res => res.json())
    .then(res => {
      console.log("PARTY =>", res);
      cb(res.game);
    });
}

export default function Game({ match }) {
  console.log("hi");
  const [game, setGame] = useState(null);
  const turn = game && game.currentTurn === "x";
  useEffect(() => {
    setTimeout(() => {
      getGame(match.params.gameId, setGame);
    }, 1000);
  });

  return (
    <div className="game-container">
      {game &&
        game.game.split("").map((s, i) => (
          <div
            key={i}
            className="game-box"
            onClick={
              s !== "_"
                ? () => {}
                : () =>
                    axios({
                      url: `/api/v1/games/${game._id}`,
                      method: "PUT",
                      data: {
                        // x: game.x,
                        // o: game.o,
                        // currentTurn: game.currentTurn,
                        // game: game.game,
                        ...game, // same as above,
                        game: setCharAt(game.game, i, game.currentTurn)
                      }
                    }).then(res => {
                      console.log("*********", res);
                      return getGame(match.params.gameId, setGame);
                    })
            }
          >
            {s}
          </div>
        ))}
    </div>
  );
}
