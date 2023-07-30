import GroupManu from "../UI/GroupManu";
import classes from "./Chat.module.css";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import { groupActions } from "../../store/groupSlice";
import { useState } from "react";

function Chat() {
  const active = useSelector((state) => state.group.active);
  const dispatch = useDispatch();

  const [manu, setmanu] = useState(false);

  // const fetchHandler = useCallback(async () => {
  //   try {
  //     const res = await fetch("http://localhost:3001/message/getmessages", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         token,
  //       },
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw new Error(data.message);
  //     } else {
  //       console.log(data);
  //       dispatch(messageActions.fetchedMessages(data));
  //     }
  //   } catch (err) {
  //     console.log("working");
  //     alert(err);
  //   }
  // }, [dispatch, token]);
  // useEffect(() => {
  //   fetchHandler();
  // }, [fetchHandler]);

  return (
    <div className={classes.div1}>
      <div className={classes.mainmanu}>
        <MdExitToApp
          size={40}
          onClick={() => dispatch(groupActions.setOn(false))}
          className={classes.ricon}
        />
        <h1>{active.name}</h1>
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
