import React, { useState } from "react";
import axios from "axios";

export default function Interactions() {
  const [response, setResponse] = useState({msg: "No actions yet."});

  return (
    <div className="interactions">
      <h3>{response.msg}</h3>
      <button
        onClick={() =>
          axios({
            url: `/api/v1/interactions/private`,
            method: "POST",
            data: {
              type: "private"
            }
          }).then(res => {
            console.log("*********", res);
            setResponse(res.data)
            return;
          }).catch((err) => {
            console.log("/////", err.request, err.response.data)
            setResponse({msg: err.response.data})
          })
        }
      >
        Private Action
      </button>
      <button
        onClick={() =>
          axios({
            url: `/api/v1/interactions/public`,
            method: "POST",
            data: {
              type: "public"
            }
          }).then(res => {
            console.log("*********", res);
            setResponse(res.data)
            return;
          })
        }
      >
        Public Action
      </button>
    </div>
  );
}
