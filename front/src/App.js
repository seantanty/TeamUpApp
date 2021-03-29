import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [names, setNames] = useState([]);

  const getData = async () => {
    try {
      const resRaw = await fetch("/data");
      const _names = await resRaw.json();
      console.log(_names);
      setNames(_names);
    } catch {
      console.error("something went wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderData = () => (
    <div className="row">
      {names.map((n) => (
        <div className="col-4" key={n}>
          Name: {n}
        </div>
      ))}
    </div>
  );
  return (
    <div className="App">
      <h1>My Front!</h1>
      data:
      {renderData()}
    </div>
  );
}

export default App;
