import React from "react";
import { Link } from "react-router-dom";
import { Box } from 'grommet';

export default function() {
  return (
    <Box
  direction="row"
  background='brand'
  pad="medium"
>
<nav>
        <div>
          <Link
            to="/"
            style={{
              fontFamily: "monospace",
              color: "white"
            }}
          >
            MERN
          </Link>
        </div>
      </nav>
</Box>
   
  );
}
