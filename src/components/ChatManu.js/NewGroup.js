import React, { useCallback, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./NewGroup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../store/groupSlice";
import User from "./User";
import AddedUser from "./AddedUser";

function NewGroup(props) {
  const [entered, setEntered] = useState("");
  const [added, setAdded] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token.token);
  const userFetch = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/group/users", {
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
        setUsers(data);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }, []);
  useEffect(() => {
    userFetch();
  }, []);
  const newGroupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/group/add", {
        method: "POST",
        body: JSON.stringify({ name: e.target.text.value, userId: added }),
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
        dispatch(
          groupActions.addGroup({ name: e.target.text.value, id: data.id })
        );
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

  const makeAdmin = (e) => {
    const updatede = { ...e };
    updatede.isAdmin = !!!updatede.isAdmin;
    const ad = added.map((e) => {
      return e.id !== updatede.id ? e : updatede;
    });
    console.log(".....", ad);
    setAdded(ad);
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
        <h4 style={{ textAlign: "center" }}>New Group</h4>
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
                onClick={() => makeAdmin(e)}
                onBack={() => backAdmin(e)}
              />
            );
          })}
        </div>
        <form onSubmit={newGroupHandler}>
          <input type="text" name="text" placeholder="Name of Group" required />
          <button type="submit">Create New Group</button>
        </form>
      </div>
    </Modal>
  );
}

export default NewGroup;
