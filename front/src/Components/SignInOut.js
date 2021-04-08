import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignInOut = () => {
  let [link, setLink] = useState("/login");
  let [buttonValue, setButtonValue] = useState("Sign in/up");

  const fetchUser = async () => {
    const userRaw = await fetch("/getUser");
    const user = await userRaw.json();
    //console.log("Got user", user); //TO DO! 
    
    if (user.username) {
      setLink("/logout");
      setButtonValue("Sign out");
    } else {
      setLink("/login");
      setButtonValue("Sign in/up");
    }
  };

  fetchUser();

  const logInOut = async () => {
    if (buttonValue === "Sign out") {
      console.log("get logout request");
      await fetch("/logout").then((res) => {
        if (res.redirected) {
          window.location.href = "/"
        }
      });
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="SignInOut">
      <Link to={link}>
        <button type="button" className="btn btn-light" onClick={logInOut}>
          {buttonValue}
        </button>
      </Link> 
    </div>
  );
};

export default SignInOut;