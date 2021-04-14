import React, { useState } from "react";
import { Link } from "react-router-dom";

let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    console.log("username", username);
    console.log("password", password);
    // check valid username and password first
    if (username.match(regExp)) {                                             // validation condition 1: email address 
      if (password === null || password === "" || password === undefined) {   // validation condition 2: null
        alert("Please enter your password.");
        console.log("stay here");
        return false;
      } else {
        const resRaw = await fetch("/checkSameUserName", {                    // validation condition 3: already exists
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        });
        const res = await resRaw.json();
        // check registered
        if (res.same === true) {
          alert("This email has been registered already.");
          console.log("stay here");
          return false;
        } else {
          // register
          await fetch("/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          }).then((response) => {
            if (response.redirected) {
              console.log(response.url);
              window.location.href = response.url;
            }
          });
        }
      }
    } else {
      alert("Please enter a valid e-mail address.");
      return false;
    }
  }

  return (
    <div className="container">
      <div className="card-header" style={{backgroundColor: "#f0ffff"}}>
        <h3 className="mb-0">Sign up</h3>
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
        <button type="submit" className="btn btn-primary" onClick={register}>
          Sign up
        </button>
        <br /> <br />
        <p className="message">
          Registered Already? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
