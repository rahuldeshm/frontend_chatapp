import React from "react";
import { useSelector } from "react-redux";

function Messages() {
  const messages = useSelector((state) => state.message.messages);
  const mess = messages.map((e) => {
    return (
      <p key={e.id} className={e.userId}>
        {e.msg}
      </p>
    );
  });
  return <div>{mess}</div>;
}

export default Messages;
