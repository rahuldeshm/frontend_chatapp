import React, { useState } from "react";
import classes from "./MainManu.module.css";
import image from "../../images/chat.png";
import { MdGroups, MdMenu } from "react-icons/md";
import NewGroup from "./NewGroup";
import Manu from "../UI/Manu";

function MainManu() {
  const [show, setShow] = useState(false);
  const [manu, setmanu] = useState(false);

  return (
    <div className={classes.mainmanu}>
      <div className={classes.img}>
        <img src={image} alt="chatting snap" />
      </div>
      <div className={classes.btns}>
        <MdGroups onClick={() => setShow(true)} size={40} />
        <MdMenu onClick={() => setmanu(!manu)} size={50} />
      </div>
      {show && <NewGroup onClick={() => setShow(false)} />}
      <Manu onClick={() => setmanu(!manu)} manu={manu} />
    </div>
  );
}

export default MainManu;
