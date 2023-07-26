import React, { useState } from "react";
import classes from "./Auth.module.css";
import Forgotpass from "./Forgotpass";
import image from "../../images/chat.png";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

function Login() {
  const [forgot, setForgot] = useState(false);
  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        console.log(data);
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
      <h4>Log in</h4>
      <form onSubmit={loginHandler}>
        <input type="email" name="email" placeholder="Email Address" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
      </form>
      <a href="#" onClick={() => setForgot(!forgot)}>
        Forgot Password
      </a>
      {forgot && <Forgotpass />}
    </div>
  );
}

export default Login;
