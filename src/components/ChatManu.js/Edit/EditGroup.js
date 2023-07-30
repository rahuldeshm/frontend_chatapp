import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./EditGroup.module.css";
import { useSelector } from "react-redux";
import User from "./../User";
import AddedUser from "../AddedUser";

function EditGroup(props) {
  const [entered, setEntered] = useState("");
  const [added, setAdded] = useState(
    props.users.filter((e) => e.usergroup.isAdmin)
  );
  const [users, setUsers] = useState(
    props.users.filter((e) => !e.usergroup.isAdmin)
  );
  const token = useSelector((state) => state.auth.token.token);

  const editAdmins = async () => {
    const admins = added.map((e) => {
      const c = { ...e };
      c.isAdmin = true;
      return c;
    });
    const other = users.map((e) => {
      const c = { ...e };
      c.isAdmin = false;
      return c;
    });
    try {
      const res = await fetch("http://localhost:3001/group/editadmins", {
        method: "POST",
        body: JSON.stringify({
          groupId: props.groupId,
          userId: [...admins, ...other],
        }),
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
        alert("Admins edited SUCCESSFULLY");
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
        <h4 style={{ textAlign: "center" }}>Select Users to Make Admin</h4>
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

        <button onClick={() => editAdmins()}>Save</button>
      </div>
    </Modal>
  );
}

export default EditGroup;
