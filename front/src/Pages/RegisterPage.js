import React, { useState } from "react";
import { Link } from "react-router-dom";

let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  async function register () {
    console.log("username", username);
    console.log("password", password);
  
    if (username.match(regExp)) {
      if (
        password === null ||
        password === "" ||
        password === undefined
      ) {
        alert("Please enter your password.");
        console.log("stay here");
        return false;
      } else {
        const resRaw = await fetch("/checkSameUserName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        });
        const res = await resRaw.json();
        if (res.same === true) {
          alert("This email has been registered already.");
          console.log("stay here");
          return false;
        } else {
          console.log("pass all front tests");

          await fetch("/register", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          }).then((response) => {
            console.log("enter here");
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
      <div className="card-header">
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