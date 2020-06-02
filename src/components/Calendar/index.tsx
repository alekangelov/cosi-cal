import React, { useState } from "react";
import { useCalendarContext } from "../../lib/contexts";
import { AddIcon } from "../Icons";
import AddEvent from "./AddEvent";

export default function Calendar() {
  const { months, days, daysInMonth, firstDay } = useCalendarContext();
  const [active, setActive] = useState<boolean>(false);
  return (
    <>
      <AddEvent {...{ active }} />
      <div className="header">
        <select className="month">
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
        {Array(daysInMonth)
          .fill(0)
          .map((e, i) => (
            <div key={i + "cell"} className="cell">
              {i + 1}
            </div>
          ))}
      </div>
    </>
  );
}
