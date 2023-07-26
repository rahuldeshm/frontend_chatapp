import React from "react";
import classes from "./Auth.module.css";
import Forgotpass from "./Forgotpass";

function Login() {
  return (
    <div className="login">
      <input type="checkbox" id="fpp" aria-hidden="true" checked="true" />
      <form onsubmit="loginHandler(event)">
        <label for="chk" aria-hidden="true">
          Login
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
        <Forgotpass />
      </form>
    </div>
  );
}

export default Login;
