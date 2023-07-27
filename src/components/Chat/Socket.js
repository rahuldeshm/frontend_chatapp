import React, { useEffect } from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../store/messageSlice";

function Socket() {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.message.socket);
  const username = useSelector((state) => state.auth.token.username);

  socket.on("user-joined", (data) => {
    dispatch(messageActions.addMessage({ msg: data, by: "joined" }));
  });
  socket.on("user-joined", (data) => {
    dispatch(messageActions.addMessage({ msg: data, by: "joined" }));
  });
  socket.on("receive", (data) => {
    console.log(data);
    if (data.name !== username) {
      dispatch(messageActions.addMessage({ msg: data.message, by: "other" }));
    }
  });
  useEffect(() => {
    socket.emit("new-user-joined", username);

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [username, socket]);
  return <Chat />;
}

export default Socket;
