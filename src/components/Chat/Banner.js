import React from "react";
import image from "../../images/banner.png";
import classes from "./Banner.module.css";
import { FaHandPointRight } from "react-icons/fa";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Banner() {
  return (
    <div className={classes.banner}>
      <div>
        <img src={image} />
      </div>
      <div className={classes.divis}>
        <p>
          <AiOutlineCopyrightCircle
            size={21}
            style={{
              color: "yellow",
              position: "relative",
              top: "5px",
              left: "-5px",
            }}
          />
          Rahul Deshmukh
        </p>
        <p>
          <FaHandPointRight
            size={20}
            style={{
              color: "yellow",
              position: "relative",
              top: "5px",
              left: "-5px",
            }}
          />{" "}
          Secured Chat.
        </p>
      </div>
    </div>
  );
}

export default Banner;
