import React from "react";
import { Link } from "react-router-dom";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import milligram from "milligram/dist/milligram.css"; // eslint-disable-line no-unused-vars

export const Buttons = () => (
  <div>
    <div styleName={"custom.docs-example"}>
      <Link to="/create">
        <button>
          Add Habit
        </button>
      </Link>
    </div>
  </div>
);
