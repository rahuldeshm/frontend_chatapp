import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./EditGroup.module.css";
import { useSelector } from "react-redux";
import User from "./../User";
import AddedUser from "../AddedUser";

function RemoveUsers(props) {
  const [entered, setEntered] = useState("");
  const [added, setAdded] = useState([]);
  const [users, setUsers] = useState(props.users);
  const token = useSelector((state) => state.auth.token.token);

  const removeHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/group/removeusers", {
        method: "POST",
        body: JSON.stringify({ groupId: props.groupId, userId: added }),
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      console.log(res);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        console.log(data);
        props.onClick();
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const addIdHandler = (e) => {
    const up = [...users].filter((us) => us.id !== e.id);

    setAdded([...added, e]);
    setUsers(up);
  };
  const backAdmin = (e) => {
    const up = [...added].filter((us) => us.id !== e.id);

    setAdded(up);
    setUsers([...users, e]);
  };

  const filteredUsers = users.filter((user) => {
    const usernameContainsText = user.username
      .toLowerCase()
      .includes(entered.toLowerCase());
    const emailContainsText = user.email
      .toLowerCase()
      .includes(entered.toLowerCase());
    return usernameContainsText || emailContainsText;
  });
  return (
    <Modal onClick={props.onClick}>
      <div className={classes.md}>
        <h4 style={{ textAlign: "center" }}>Select Users to remove</h4>
        <input
          value={entered}
          type="text"
          placeholder="Search User"
          onChange={(e) => setEntered(e.target.value)}
        />
        <div className={classes.user}>
          {filteredUsers.map((e) => {
            return (
              <User key={Math.random()} onClick={() => addIdHandler(e)} e={e} />
            );
          })}
        </div>
        <div className={classes.use}>
          {added.map((e) => {
            return (
              <AddedUser
                key={Math.random()}
                e={e}
                onClick={() => console.log("")}
                onBack={() => backAdmin(e)}
              />
            );
          })}
        </div>
        <button onClick={removeHandler}>Remove from group</button>
      </div>
    </Modal>
  );
}

export default RemoveUsers;
