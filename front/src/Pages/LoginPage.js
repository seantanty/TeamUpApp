import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const login = async () => {
    await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            })}).then((res) => console.log(res));
  };

  return (
    <div className="container">
      <div className="card-header">
        <h3 className="mb-0">Sign in </h3>
      </div>
      <div className="card-body">
        <form 
          method="POST"
          onSubmit={login}>
          <div class="form-group">
            <label className="form-label">
              Email address
              <input
                type="email"
                className="form-control form-control-lg rounded-0"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
               />
            </label>
          </div>
          <div class="form-group">
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
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Sign in 
          </button>
          <br /><br />
          <p className="message">
            Not Registered? <Link to="/register">Sign up</Link>
          </p>
        </form>

      </div>
    </div>
  
  );
};

export default LoginPage;

