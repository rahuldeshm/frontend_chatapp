// import React, { useCallback, useEffect } from "react";
import classes from "./Layout.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { messageActions } from "../../store/messageSlice";
import Socket from "../Chat/Socket";
import Chatmanu from "../ChatManu.js/Chatmanu";
import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import { useEffect } from "react";
// import { messageActions } from "../../store/messageSlice";
// import { useDispatch, useSelector } from "react-redux";

function Layout() {
  const on = useSelector((state) => state.group.on);

  return (
    <div className={classes.mainlay}>
      <div className={on ? classes.manuon : classes.manu}>
        <Chatmanu />
      </div>
      <div className={on ? classes.messageon : classes.messages}>
        <Socket />
      </div>
    </div>
  );
}

export default Layout;
