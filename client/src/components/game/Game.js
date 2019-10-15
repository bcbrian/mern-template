import React, { useState, useEffect } from "react";

export default function Game({ match }) {
  const [game, setGame] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      fetch(`/api/v1/games/${match.params.gameId}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setGame(res.game);
        });
    }, 1000);
  });

  return (
    <div>
      {game && game.game.split("").map(s => <div>{s}</div>)}
    </div>
  );
}
