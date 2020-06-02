import React, { useState, FunctionComponent } from "react";
import { useCalendarContext } from "../../lib/contexts";
import { AddIcon } from "../Icons";
import AddEvent from "./AddEvent";
import moment from "moment";
import { Event } from "../../lib/contexts";

const SingleEvent = (props: any) => {
  console.log(props.event);
  return <div className="event-single"></div>;
};

const DaysInMonth: FunctionComponent = (props) => {
  const { daysInMonth, events } = useCalendarContext();

  return (
    <>
      {Array(daysInMonth)
        .fill(0)
        .map((e, i) => {
          const singleDate = i + 1;
          const eventsHere = events?.filter((e, i) => {
            return singleDate === moment(e.date, "YYYY-MM-DD").get("D");
          });
          console.log(eventsHere);
          return (
            <div key={i + "cell"} className="cell">
              <h2>{singleDate}</h2>
              <div className="events">
                {eventsHere?.map((e, i) => (
                  <SingleEvent key={i + "singleEvent"} event={e} />
                ))}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default function Calendar() {
  const { months, days, firstDay, month } = useCalendarContext();
  const [active, setActive] = useState<boolean>(false);
  return (
    <>
      <AddEvent {...{ active, toggle: () => setActive(false) }} />
      <div className="header">
        <select className="month" value={month}>
          {months?.map((e, i) => (
            <option key={e.value + "option"} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
        <button
          className="controls"
          onClick={() => {
            setActive((state) => !state);
          }}
        >
          <AddIcon />
        </button>
      </div>
      <div className="calendar">
        {days?.map((e, i) => (
          <div key={i + "headerCell"} className="cell header">
            <h3>{e}</h3>
          </div>
        ))}
        {Array(firstDay)
          .fill(0)
          .map((e, i) => (
            <div key={i + "emptyCell"} className="cell"></div>
          ))}
        <DaysInMonth />
      </div>
    </>
  );
}
