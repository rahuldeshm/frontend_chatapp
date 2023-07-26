import React from "react";
import classes from "./Auth.module.css";
import image from "../../images/chat.png";

function Signup() {
  const signUpHandler = (event) => {
    console.log("signup");
  };
  return (
    <div className={classes.chatmain}>
      <img className={classes.img} src={image} />
      <h4>Sign Up</h4>
      <form onSubmit={signUpHandler}>
        <input
          id="username"
          type="text"
          name="txt"
          placeholder="User Name"
          required
        />
        <input
          id="semail"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <input
          id="phone"
          type="number"
          name="phone"
          placeholder="Phone Number"
          required
        />
        <input
          id="spassword"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          id="scpassword"
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
