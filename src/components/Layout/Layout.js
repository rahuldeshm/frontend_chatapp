import classes from "./Layout.module.css";
import Socket from "../Chat/Socket";
import Chatmanu from "../ChatManu.js/Chatmanu";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../store/messageSlice";
import { useEffect } from "react";

function Layout() {
  const on = useSelector((state) => state.group.on);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.auth.socket);
  useEffect(() => {
    socket.on("becamelive", (e) => {
      dispatch(messageActions.addMessage(e));
    });

    socket.on("receive", (e) => {
      dispatch(messageActions.addMessage(e));
    });
  }, [dispatch]);
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
