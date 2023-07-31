import classes from "./Layout.module.css";
import Socket from "../Chat/Socket";
import Chatmanu from "../ChatManu.js/Chatmanu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "../../store/authSlice";

function Layout() {
  const on = useSelector((state) => state.group.on);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     dispatch(authActions.updateSocket({ id: socket.id, connected: true }));
  //   });
  // }, [dispatch]);

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
