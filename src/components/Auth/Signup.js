import React from "react";
import classes from "./Auth.module.css";
import image from "../../images/chat.png";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

function Signup() {
  const dispatch = useDispatch();

  const signUpHandler = async (event) => {
    event.preventDefault();
    const username = event.target.txt.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const cpassword = event.target.cpassword.value;
    const password = event.target.password.value;
    if (cpassword !== password) {
      alert("Password and Confirm Password doesn't Match.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, email, phone, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        dispatch(authActions.login(data));
        localStorage.setItem("token", JSON.stringify(data));
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  return (
    <div className={classes.chatmain}>
      <img className={classes.img} src={image} alt="chatting logo" />
      <h4>Sign Up</h4>
      <form onSubmit={signUpHandler}>
        <input type="text" name="txt" placeholder="User Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="number" name="phone" placeholder="Phone Number" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
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
