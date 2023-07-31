import React, { useState } from "react";
import { messageActions } from "../../store/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Chat.module.css";
import { HiOutlinePhotograph } from "react-icons/hi";

function NewMessage() {
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [addfile, setAddfile] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token.token);
  const username = useSelector((state) => state.auth.token.username);
  const groupId = useSelector((state) => state.group.active.id);
  const socket = useSelector((state) => state.auth.socket);

  const sendMessage = async (e) => {
    e.preventDefault();
    const link =
      file === null
        ? "http://localhost:3001/message/newmessage"
        : "http://localhost:3001/upload";
    let formData;
    if (file !== null) {
      formData = new FormData();
      formData.append("file", file);
      formData.append("msg", msg);
      formData.append("groupId", groupId);
    }
    const body = file === null ? JSON.stringify({ msg, groupId }) : formData;
    const headers =
      file === null
        ? {
            "Content-Type": "application/json",
            token,
          }
        : {
            token,
          };
    try {
      const res = await fetch(link, {
        method: "POST",
        body: body,
        headers,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        socket.emit("send", msg, `${groupId}this`, data.url);
        console.log(data);
        const ud = { ...data, user: { username } };
        setMsg("");
        if (file !== null) {
          setFile(null);
          setAddfile(!addfile);
        }
        dispatch(messageActions.addMessage(ud));
      }
    } catch (err) {
      console.log("working");
      alert(err);
    }
  };
  return (
    <div className={classes.inputmessage}>
      <form
        encType="multipart/form-data"
        className={classes.form}
        onSubmit={sendMessage}
      >
        <HiOutlinePhotograph
          size={40}
          onClick={() => {
            setFile(null);
            setAddfile(!addfile);
          }}
          className={classes.icon}
        />
        {addfile && (
          <input
            className={classes.file}
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        )}
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
