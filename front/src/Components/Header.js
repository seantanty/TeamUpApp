import React from "react";
import NavigationBar from "./NavigationBar.js";
import SignInOut from "./SignInOut.js";

const Header = () => {
  return (
    <div className="headerBody">
      <NavigationBar></NavigationBar>
      <SignInOut></SignInOut>
    </div>
  );
};

export default Header;
