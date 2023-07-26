import React, { useState } from "react";
import Signup from "./Signup.js";
import Login from "./Login.js";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaHandPointRight } from "react-icons/fa";
import classes from "./Layout.module.css";

function Auth() {
  const [active, setActive] = useState(true);
  return (
    <div className={classes.main}>
      <div className={classes.auth}>
        {active ? <Signup /> : <Login />}
        <div className={classes.tab}>
          <h5 onClick={() => setActive(!active)}>
            {active ? "Have a account Login" : "New Here Sign Up"}
          </h5>
        </div>
      </div>
      <div className={classes.disc}>
        <div>
          <h1>MESSANGING</h1>
          <p>
            <FaHandPointRight size={20} className={classes.message} />
            Message live - Receiver will get message instantly when someone send
            a message.
          </p>
          <p>
            <FaHandPointRight size={20} className={classes.message} />
            One to one chat - User can chat with any one who is on this
            messanger.
          </p>
          <p>
            <FaHandPointRight size={20} className={classes.message} />
            Group chat - User can create a group of about 20 people.
          </p>
          <p>
            <FaHandPointRight size={20} className={classes.message} />
            Image sheraing - In the message user can send Images.
          </p>
          <p>
            <FaHandPointRight size={20} className={classes.message} />
            Dummy Login Id - test@test.com
          </p>
          <p>
            <FaHandPointRight size={20} className={classes.message} />
            Dummy Login Password - testtest
          </p>
        </div>
        <p>
          <AiOutlineCopyrightCircle
            size={18}
            style={{
              color: "yellow",
              position: "relative",
              top: "3px",
              left: "-5px",
            }}
          />
          Rahul Deshmukh
        </p>
      </div>
    </div>
  );
}

export default Auth;
