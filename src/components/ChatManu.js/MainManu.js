import React, { useState } from "react";
import classes from "./MainManu.module.css";
import image from "../../images/chat.png";
import { MdGroups, MdMenu } from "react-icons/md";
import NewGroup from "./NewGroup";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

function MainManu() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={classes.mainmanu}>
      <div className={classes.img}>
        <img src={image} alt="chatting snap" />
      </div>
      <div className={classes.btns}>
        <MdGroups onClick={() => setShow(true)} size={40} />
        <MdMenu onClick={() => dispatch(authActions.logOut())} size={50} />
      </div>
      {show && <NewGroup onClick={() => setShow(false)} />}
    </div>
  );
}

export default MainManu;
