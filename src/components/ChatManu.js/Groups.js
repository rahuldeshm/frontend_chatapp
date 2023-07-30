import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Groups.module.css";
import GroupItem from "./GroupItem";
import { groupActions } from "../../store/groupSlice";

function Groups() {
  const groups = useSelector((state) => state.group.groups);
  const token = useSelector((state) => state.auth.token.token);
  const dispatch = useDispatch();
  const groupHandler = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/group/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        console.log(">>>>>", data);
        dispatch(groupActions.addGroups(data));
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }, [dispatch, token]);
  useEffect(() => {
    groupHandler();
  }, [groupHandler]);
  return (
    <div className={classes.groups}>
      {groups.map((e) => {
        return <GroupItem key={Math.random()} e={e} />;
      })}
    </div>
  );
}

export default Groups;
