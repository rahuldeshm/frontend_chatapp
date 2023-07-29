import React from "react";
import { useSelector } from "react-redux";
import classes from "./Chat.module.css";

function Messages() {
  const messages = useSelector((state) => state.message.messages);
  const username = useSelector((state) => state.auth.token.username);
  const mess = messages.map((e) => {
    return (
      <p
        key={`${Math.random()}`}
        className={classes[e.user.username === username ? "you" : "other"]}
      >
        {`${e.user.username === username ? "you" : e.user.username}: ${e.msg}`}
      </p>
    );
  });
  return <div>{mess}</div>;
}

export default Messages;
