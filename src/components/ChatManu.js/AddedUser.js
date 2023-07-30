import React from "react";
import { IoMdRemoveCircle } from "react-icons/io";
import classes from "./User.module.css";

function User(props) {
  return (
    <div className={props.e.isAdmin ? classes.ause : classes.use}>
      <p onClick={props.onClick}>{props.e.username}</p>
      <IoMdRemoveCircle
        size={30}
        onClick={props.onBack}
        className={classes.ico}
      />
    </div>
  );
}

export default User;
