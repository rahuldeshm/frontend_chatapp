import React from "react";
import classes from "./Auth.module.css";

function Forgotpass() {
  return (
    <div>
      <label for="fpp" className="forgotpass" aria-hidden="true">
        Forgot Password
      </label>
      <form className="forgotform" onsubmit="forgotHandler(event)">
        <input
          id="femail"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <button type="submit">Send Link</button>
      </form>
    </div>
  );
}

export default Forgotpass;
