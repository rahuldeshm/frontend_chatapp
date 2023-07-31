import GroupManu from "../UI/GroupManu";
import classes from "./Chat.module.css";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import { groupActions } from "../../store/groupSlice";
import { useEffect, useState } from "react";

function Chat() {
  const activeid = useSelector((state) => state.group.active.id);
  const activename = useSelector((state) => state.group.active.name);
  const dispatch = useDispatch();
  const [manu, setmanu] = useState(false);
  const socket = useSelector((state) => state.auth.socket);

  useEffect(() => {
    socket.emit("createroom", `${activeid}this`);
    return () => {
      socket.emit("leaveroom", `${activeid}this`);
    };
  }, [activeid, socket]);

  return (
    <div className={classes.div1}>
      <div className={classes.mainmanu}>
        <MdExitToApp
          size={40}
          onClick={() => dispatch(groupActions.setOn(false))}
          className={classes.ricon}
        />
        <h1>{activename}</h1>
        <BsThreeDotsVertical size={30} onClick={() => setmanu(!manu)} />
      </div>

      <div className={classes.messages}>
        <Messages />
      </div>
      <NewMessage />

      {manu && <GroupManu onClick={() => setmanu(!manu)} manu={manu} />}
    </div>
  );
}

export default Chat;
