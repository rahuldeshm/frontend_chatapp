import React, { useCallback, useEffect, useState } from "react";
import classes from ".//Manu.module.css";
import { useDispatch, useSelector } from "react-redux";
import User from "../ChatManu.js/User";
import AddUser from "../ChatManu.js/Edit/AddUsers";
import { groupActions } from "../../store/groupSlice";
import ChangeName from "../ChatManu.js/Edit/ChangeName";
import RemoveUsers from "../ChatManu.js/Edit/RemoveUsers";
import EditGroup from "../ChatManu.js/Edit/EditGroup";

function Manu(props) {
  const group = useSelector((state) => state.group.active.id);
  const groupname = useSelector((state) => state.group.active.name);
  const token = useSelector((state) => state.auth.token.token);
  const email = useSelector((state) => state.auth.token.email);
  const [show, setShow] = useState(false);
  const [showadd, setShowAdd] = useState(false);
  const [showrm, setShowrm] = useState(false);
  const [showchange, setShowChange] = useState(false);
  const [isAdmin, setAdmin] = useState("NOT");
  const [groupusers, setGroupusers] = useState([]);
  const dispatch = useDispatch();
  function closeHandler(e) {
    props.onClick();
  }
  const fetchGroupusers = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/group/getgroupusers/${group}`,
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
        console.log(data.users);
        setGroupusers(data.users);
      }
    } catch (err) {
      alert(err);
    }
  }, [token, group]);
  const leaveGroup = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/group/leavegroup/${group}`,
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
        props.onClick();
        dispatch(groupActions.removeGroup(group));
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchGroupusers();
  }, [fetchGroupusers]);
  return (
    <>
      <div
        onClick={closeHandler}
        className={props.manu ? classes.overley : classes.activeoverley}
      ></div>
      <div className={props.manu ? classes.manu : classes.activemanu}>
        <div className={classes.mainmanu}>
          <h2>{`Group Name: ${groupname}`}</h2>
        </div>
        <div className={classes.users}>
          {groupusers.map((e) => {
            if (isAdmin === "NOT" && e.email === email) {
              setAdmin(e.usergroup.isAdmin);
            }
            return <User key={Math.random()} e={e} />;
          })}
        </div>
        {isAdmin && (
          <button className={classes.btn} onClick={() => setShow(!show)}>
            Edit Admins
          </button>
        )}
        {isAdmin && (
          <button className={classes.btn} onClick={() => setShowrm(!showrm)}>
            Remove Users
          </button>
        )}
        {isAdmin && (
          <button className={classes.btn} onClick={() => setShowAdd(!showadd)}>
            Add Users
          </button>
        )}
        {isAdmin && (
          <button
            className={classes.btn}
            onClick={() => setShowChange(!showchange)}
          >
            Change Name
          </button>
        )}

        <button className={classes.btn} onClick={leaveGroup}>
          Leave Group
        </button>
        {show && (
          <EditGroup
            onClick={() => setShow(!show)}
            users={groupusers}
            groupId={group}
          />
        )}
        {showadd && (
          <AddUser
            onClick={() => {
              setShowAdd(!showadd);
              props.onClick();
            }}
            groupId={group}
          />
        )}
        {showchange && (
          <ChangeName
            onClick={() => {
              setShowChange(!showchange);
            }}
            groupId={group}
          />
        )}
        {showrm && (
          <RemoveUsers
            onClick={() => {
              setShowrm(!showrm);
              props.onClick();
            }}
            groupId={group}
            users={groupusers}
          />
        )}
      </div>
    </>
  );
}

export default Manu;
