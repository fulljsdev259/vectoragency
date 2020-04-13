import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Meetings from "./screens/Meetings";
import AddMeetings from "./screens/AddMeeting";

export default function Routes() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Meetings} />
          <Route exact path="/add-meetings" component={AddMeetings} />
        </Switch>
      </Router>
  );
}
