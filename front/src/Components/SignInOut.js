import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";

const SignInOut = () => {
  const [link, setLink] = useState("/login");
  const [buttonValue, setButtonValue] = useState("SIGN IN/UP");
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log("Got user", loggedInUser);

    if (loggedInUser) {
      setLink("/logout");
      setButtonValue("SIGN OUT");
    } else {
      setLink("/login");
      setButtonValue("SIGN IN/UP");
    }
    console.log("link", buttonValue);
  }, [buttonValue]
  );
  
  const logInOut = async () => {
    if (buttonValue === "SIGN OUT") {
      console.log("get logout request");
      await fetch("/logout").then((res) => {
        localStorage.removeItem("user");
        if (res.redirected) {
          window.location.href = "/";
        }
      });
    } else {
      window.location.href = "/login";
    }
  };

  const buttonStyle = {
    background: "none",
    border: 0,
  };

  return (
    <div className="SignInOut">
      <Link to={link}>
        <button
          type="button"
          className="btn btn-light"
          style={buttonStyle}
          onClick={logInOut}
        >
          {buttonValue}
        </button>
      </Link>
    </div>
  );
};

export default SignInOut;
