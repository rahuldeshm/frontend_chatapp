import React, { useState } from "react";
import classes from "./Chat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../store/messageSlice";
import Messages from "./Messages";

function Chat() {
  const [msg, setMsg] = useState("");
  const socket = useSelector((state) => state.message.socket);
  // const token = useSelector((state) => state.auth.token.token);
  const dispatch = useDispatch();
  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("http://localhost:3001/message/newmessage", {
  //       method: "POST",
  //       body: JSON.stringify({ msg }),
  //       headers: {
  //         "Content-Type": "application/json",
  //         token,
  //       },
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw new Error(data.message);
  //     } else {
  //       console.log(data);
  //       setMsg("");
  //       dispatch(messageActions.addMessage(data));
  //     }
  //   } catch (err) {
  //     console.log("working");
  //     alert(err);
  //   }
  // };
  const sendMessage = async (e) => {
    e.preventDefault();

    dispatch(messageActions.addMessage({ msg, by: "you" }));
    socket.emit("send", msg);
    setMsg("");
  };

  return (
    <div className={classes.div1}>
      <h1>Messages</h1>

      <div className={classes.messages}>
        <Messages />
      </div>
      <div className={classes.inputmessage}>
        <form className={classes.form} onSubmit={sendMessage}>
          <input
            value={msg}
            type="text"
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
