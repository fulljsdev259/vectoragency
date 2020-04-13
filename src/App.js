import React from "react";
import Meetings from "./screens/Meetings";
import { Provider } from "react-redux";
import store from "./redux/store";
import AddMeeting from "./screens/AddMeeting";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
