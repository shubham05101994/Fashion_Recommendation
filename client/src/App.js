import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div>
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              
            </div>
            <div className="">
            <Route exact path="/profile" component={Profile} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
