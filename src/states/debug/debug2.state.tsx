import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={Test} />
      </div>
    </Router>
  );
}

function Test() {
  return <div>This is a test component</div>;
}

export default class Debug2 extends Component {
  render() {
    return <div>{ParamsExample()}</div>;
  }
}
