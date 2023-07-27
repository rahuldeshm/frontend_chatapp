import React from "react";
import { useSelector } from "react-redux";
import classes from "./Chat.module.css";

function Messages() {
  const messages = useSelector((state) => state.message.messages);
  const mess = messages.map((e) => {
    return (
      <p key={`${Math.random()}`} className={classes[e.by]}>
        {`${e.by}: ${e.msg}`}
      </p>
    );
  });
  return <div>{mess}</div>;
}

export default Messages;
