import React, { useCallback, useEffect } from "react";
import Chat from "../Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../store/messageSlice";

function Layout() {
  const token = useSelector((state) => state.auth.token.token);
  const dispatch = useDispatch();
  const fetchHandler = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/message/getmessages", {
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
        console.log(data);
        dispatch(messageActions.fetchedMessages(data));
      }
    } catch (err) {
      console.log("working");
      alert(err);
    }
  }, [dispatch, token]);
  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);
  return <Chat />;
}

export default Layout;
