import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import * as Datetime from "react-datetime";
import dropdownIcon from "../assets/images/menu.svg";
import moment from "moment";
import { useSelector } from "react-redux";

export default function AddMeeting(props) {
  const [state, setState] = useState({
    meetingDate: moment(new Date(props.location.state.meetingsDate)).toDate(),
    startTime: moment().format("hh:mm A"),
    endTime: moment().format("hh:mm A"),
    currentTime: moment().format("hh:mm A"),
  });
  const meeting = useSelector((state) => state.meetings.data);

  //pushing to meetings page if page get refreshed and no data in reducer.
  useEffect(() => {
    !meeting.length && props.history.push("/");
  }, []);

  //checking the user's selected slot is valid for the time.
  function handleAddMeeting() {
    let startTime = moment(state.startTime, "hh:mm A"),
      endTime = moment(state.endTime, "hh:mm A"),
      currentTime = moment(state.currentTime, "hh:mm A"),
      isToday = moment(state.meetingDate).isSame(moment(), 'day');

    if (isToday && (startTime.isBefore(currentTime) || endTime.isBefore(currentTime))) {
      alert("Meeting's slot time can not be less than current time.");
    } else if (endTime.isBefore(startTime) || startTime.isSame(endTime)) {
      alert("Meeting's End time can not be less than Start time or same as Start time.");
    } else if (handleCheckSlot()) {
      alert("Meeting slot is not available");
    } else {
      alert("Meeting has added successfully.");
    }   
  }

  //checking the meeting slot from pre sheduled meetings for the date.
  function handleCheckSlot() {
    let startTime = moment(state.startTime, "hh:mm A"),
      time = (time) => moment(time, ["HH:mm"]).format("HH:mm A");

    const availableStartTime = meeting.filter((meeting) =>
      startTime.isSame(moment(time(meeting.start_time), "hh:mm A"))
    );
    if (availableStartTime.length) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <Header heading='Add Meeting'/>
      <div className="add-meeting container">
        <div onClick={handleAddMeeting} className={`add-meeting-btn `}>
          <div>Save</div>{" "}
        </div>
        <div className="add-meeting-conntent-wrapper">
          <div className="card">
            <div className="dropdown">
              <Datetime
                className="date-picker date"
                inputProps={{ placeholder: "Meeting Date", disabled: true }}
                timeFormat={false}
                dateFormat={"DD/MM/YYYY"}
                onChange={(value) =>
                  setState({ ...state, meetingDate: value.toDate() })
                }
                value={state.meetingDate}
              />
              <img
                className="drop-down-icon"
                src={dropdownIcon}
                alt="drop_down_icon"
              />
            </div>
            <div className="en-date-wrapper">
              <div className="dropdown">
                <Datetime
                  className="date-picker date"
                  inputProps={{ placeholder: "Start Time" }}
                  dateFormat={false}
                  timeFormat={"hh:mm A"}
                  value={state.startTime}
                  onChange={(value) =>
                    value.format &&
                    setState({ ...state, startTime: value.format("hh:mm A") })
                  }
                />
                <img
                  className="drop-down-icon"
                  src={dropdownIcon}
                  alt="drop_down_icon"
                />
              </div>
              <div className="dropdown">
                <Datetime
                  className="date-picker date"
                  inputProps={{ placeholder: "End Time" }}
                  dateFormat={false}
                  value={state.endTime}
                  timeFormat={"hh:mm A"}
                  onChange={(value) =>
                    value.format &&
                    setState({ ...state, endTime: value.format("hh:mm A") })
                  }
                />
                <img
                  className="drop-down-icon"
                  src={dropdownIcon}
                  alt="drop_down_icon"
                />
              </div>
            </div>
            <div className="description-wrapper">
              <textarea className="description" placeholder="Description" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
