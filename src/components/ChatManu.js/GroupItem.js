import React from "react";
import classes from "./Groups.module.css";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../store/groupSlice";
import { messageActions } from "../../store/messageSlice";

function GroupItem(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token.token);
  const fetchGroupMessages = async () => {
    dispatch(groupActions.setActive(props.e));
    console.log(props.e.id);
    try {
      const res = await fetch(
        `http://localhost:3001/message/getmessages/${props.e.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        console.log(data);
        dispatch(messageActions.fetchedMessages(data));
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div onClick={fetchGroupMessages} className={classes.group}>
      <h3>{props.e.name}</h3>
    </div>
  );
}

export default GroupItem;
