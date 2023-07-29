import React from "react";
import classes from "./Groups.module.css";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../store/groupSlice";
import { messageActions } from "../../store/messageSlice";

function GroupItem(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token.token);

  const fetchGroupMessages = async () => {
    const locm = JSON.parse(localStorage.getItem(`${props.e.id}group`));
    const locmp = !!locm ? locm : [];
    const haveId = locmp.length > 0 ? locmp[locmp.length - 1].id : 0;

    try {
      const res = await fetch(
        `http://localhost:3001/message/getmessages/${props.e.id}`,
        {
          method: "POST",
          body: JSON.stringify({ haveId }),
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
        dispatch(groupActions.setActive(props.e));
        dispatch(messageActions.fetchedMessages([...locmp, ...data]));
        localStorage.setItem(
          `${props.e.id}group`,
          JSON.stringify([...locmp, ...data])
        );
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
