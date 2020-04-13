import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import rightArrow from "../assets/images/right.svg";
import leftArrow from "../assets/images/back.svg";
import MeetingCard from "../components/MettingCard";
import Loader from "../components/Loader";
import dateFormatter from "../utils/dateFormatter";
import { useDispatch } from "react-redux";
import * as constants from "../redux/constants";

export default function Meetings({ history }) {
  const [state, setState] = useState({
    meetings: [],
    message: "",
    meetingsDate: "",
  });
  const [isLoading, setLoading] = useState(false);
  const stateRef = useRef();
  stateRef.current = state;
  const dispatch = useDispatch();
  const isDateValid = dateFormatter(state.meetingsDate).today;

  //setting the current date and getting mettings the date.
  useEffect(() => {
    const date = dateFormatter();
    setState({ ...state, meetingsDate: date.meetingDate });
    setLoading(true);
    getMeetins(date.apiDate);
  }, []);

  //to fetch the meetings from the url.
  function getMeetins(date) {
    fetch(
      `http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${date}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.length) {
          dispatch({ type: constants.GET_MEETINGS_SUCCESS, payload: data });
          setState({ ...stateRef.current, meetings: data, message: "" });
        } else {
          setState({
            ...stateRef.current,
            message: "No Meetings Available For the Day.",
            meetings: [],
          });
        }
      });
  }

  //to get the past or future date's meetings 
  function handleMeetings(action) {
    const { meetingsDate } = state;
    setLoading(true);
    const date = dateFormatter(meetingsDate, action);
    setState({ ...state, meetingsDate: date.meetingDate, meetings: [] });
    getMeetins(date.apiDate);
  }

  //pushing the user to add meeteing page 
  function handleClick() {
    history.push("add-meetings", { meetingsDate: state.meetingsDate });
  }

  return (
    <div className="container">
      <Header  heading='Meetings'/>
      <div className="meeting-date-wrapper">
        <img
          onClick={() => handleMeetings("pre")}
          className="arrow-img"
          alt="left-arrow"
          src={leftArrow}
        />
        <span className="meeting-date">{state.meetingsDate}</span>
        <img
          onClick={() => handleMeetings("next")}
          className="arrow-img"
          alt="right-arrow"
          src={rightArrow}
        />
      </div>
      <Loader isLoading={isLoading} message={state.message} />
      {state.meetings.length > 0 && (
        <div className="meeting-content-wrapper">
          <MeetingCard meetings={state.meetings} />
        </div>
      )}
      <div className={`add-meeting-btn ${!isDateValid && "disable"} `}>
        <div
          disabled={true}
          onClick={() => (isDateValid ? handleClick() : null)}
        >
          Add Meeting
        </div>{" "}
      </div>
    </div>
  );
}
