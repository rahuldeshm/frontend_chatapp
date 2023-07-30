import Modal from "../../UI/Modal";
import classes from "./EditGroup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../../store/groupSlice";

function ChangeName(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token.token);

  const changeNameHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/group/changegroupname", {
        method: "POST",
        body: JSON.stringify({
          name: e.target.text.value,
          groupId: props.groupId,
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
        dispatch(
          groupActions.changeName({
            name: e.target.text.value,
            id: props.groupId,
          })
        );
        props.onClick();
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <Modal onClick={props.onClick}>
      <div className={classes.md}>
        <h4 style={{ textAlign: "center" }}>Change Name of Group</h4>

        <form onSubmit={changeNameHandler}>
          <input type="text" name="text" placeholder="Name of Group" required />
          <button type="submit">Change Name</button>
        </form>
      </div>
    </Modal>
  );
}

export default ChangeName;
