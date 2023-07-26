import React from "react";
import classes from "./Chat.module.css";

function Chat() {
  return (
    <div className={classes.div}>
      <div>
        <h1>What's up </h1>
      </div>
      <div className={classes.messages}></div>
      <div className={classes.inputmessage}>
        <form className={classes.form}>
          <input type="text" placeholder="Type a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
