// import React, { useEffect } from "react";
import Chat from "./Chat";
import Banner from "./Banner";
import { useSelector } from "react-redux";

function Socket() {
  const on = useSelector((state) => state.group.on);

  // const dispatch = useDispatch();
  // const socket = useSelector((state) => state.auth.socket);
  // const username = useSelector((state) => state.auth.token.username);

  // socket.on("user-joined", (data) => {
  //   dispatch(messageActions.addMessage({ msg: data, by: "joined" }));
  // });
  // socket.on("left", (data) => {
  //   dispatch(messageActions.addMessage({ msg: data, by: "left" }));
  // });
  // socket.on("receive", (data) => {
  //   if (data.name !== username) {
  //     dispatch(messageActions.addMessage({ msg: data.message, by: "other" }));
  //   }
  // });
  // useEffect(() => {
  //   socket.emit("new-user-joined", username);
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [username, socket]);
  return <>{on ? <Chat /> : <Banner />}</>;
}

export default Socket;
