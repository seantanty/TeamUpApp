import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();
    const resRaw = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    console.log("redirected?", resRaw.redirected);
    if (resRaw.redirected) {
      alert("Incorrect username or password!");
    } else {
      const res = await resRaw.json();
      const userInfo = JSON.stringify({
        username: username,
        userid: res.userid,
      });
      localStorage.setItem("user", userInfo);
      window.location.href = "/";
    }
    
      
  };

  return (
    <div className="container">
      <div className="card-header">
        <h3 className="mb-0">Sign in </h3>
      </div>
      <div className="card-body">
        <label className="form-label">
          Email address
          <input
            type="email"
            className="form-control form-control-lg rounded-0"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          Password
          <input
            type="password"
            name="password"
            className="form-control form-control-lg rounded-0"
            required=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <br />
        <button type="submit" className="btn btn-primary" onClick={login}>
          Sign in
        </button>
        <br />
        <br />
        <p className="message">
          Not Registered? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
