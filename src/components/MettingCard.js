import React from "react";
import moment from 'moment'

export default function MeetingCard({ meetings }) {
    let time = (time) => moment(time, ["HH:mm"]).format("HH:mm A");
  return (
    <>
      {meetings.map((item, index) => (
        <div
          key={`${index}`}
          className="meeting-card"
          style={meetings.length - 1 === index ? { marginBottom: 0 } : {}}
        >
          <div className="meeting-time">
            {time(item.start_time)} - {time(item.end_time)}
          </div>
          <div className="meeting-description">
            Meeting with{" "}
            {item.participants
              .fill(
                `and ${item.participants[item.participants.length - 1]}`,
                -1
              )
              .map((partipant, i) => (
                <span key={`${i}`}>
                  {partipant}
                  {item.participants.length > 2 &&
                    item.participants.length - 2 > i &&
                    ","}{" "}
                </span>
              ))}{" "}
            for {item.description}
          </div>
        </div>
      ))}
    </>
  );
}
