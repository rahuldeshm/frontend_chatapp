import React, { useState } from "react";
import { messageActions } from "../../store/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Chat.module.css";

function NewMessage() {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token.token);
  const username = useSelector((state) => state.auth.token.username);
  const groupId = useSelector((state) => state.group.active.id);
  const socket = useSelector((state) => state.auth.socket);

  const sendMessage = async (e) => {
    e.preventDefault();
    socket.emit("send", msg, `${groupId}this`);
    try {
      const res = await fetch("http://localhost:3001/message/newmessage", {
        method: "POST",
        body: JSON.stringify({ msg, groupId }),
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        console.log(data);
        const ud = { ...data, user: { username } };
        setMsg("");
        dispatch(messageActions.addMessage(ud));
      }
    } catch (err) {
      console.log("working");
      alert(err);
    }
  };
  return (
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
  );
}

export default NewMessage;
