import React from "react";

function Forgotpass() {
  return (
    <div>
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
