import React, { Component } from "react";
import Movies from "./components/movies";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container" style={{ marginTop: "30px" }}>
        <Movies />
      </main>
    );
  }
}

export default App;
