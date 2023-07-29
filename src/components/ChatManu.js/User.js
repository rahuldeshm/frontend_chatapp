import React from "react";
import classes from "./User.module.css";

function User(props) {
  return (
    <div className={classes.us} onClick={props.onClick}>
      <p>{props.e.username}</p>
      <p>{props.e.email}</p>
    </div>
  );
}

export default User;
