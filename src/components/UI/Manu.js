import React from "react";
import classes from ".//Manu.module.css";
import { authActions } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Manu(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  function closeHandler(e) {
    props.onClick();
  }
  return (
    <>
      <div
        onClick={closeHandler}
        className={props.manu ? classes.overley : classes.activeoverley}
      ></div>
      <div className={props.manu ? classes.manu : classes.activemanu}>
        <div className={classes.mainmanu}>
          <h2>{token.username}</h2>
        </div>
        <button onClick={() => dispatch(authActions.logOut())}>Log Out</button>
      </div>
    </>
  );
}

export default Manu;
