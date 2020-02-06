import React, { useContext } from "react";

import { AuthContext } from "../../auth/auth";

export default function Dashboard() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h4>
        <b>Hey there,</b> {user.name.split(" ")[0]}
        <p>You are logged in.</p>
      </h4>
      <button
        onClick={e => {
          e.preventDefault();
          logoutUser();
        }}
      >
        Logout
      </button>
    </div>
  );
}
