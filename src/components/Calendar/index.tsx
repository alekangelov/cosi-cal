import React, { useState } from "react";
import { useCalendarContext, useCalendarDispatch } from "../../lib/contexts";
import { AddIcon } from "../Icons";
import AddEvent from "./AddEvent";
import ViewEvent from "./ViewEvent";
import { DaysInMonth } from "./DaysInMonth";

export default function Calendar() {
  const { months, firstDay, days, month } = useCalendarContext();
  const dispatch = useCalendarDispatch();
  const [active, setActive] = useState<boolean>(false);
  return (
    <>
      <AddEvent {...{ active, toggle: () => setActive(false) }} />
      <ViewEvent />
      <div className="header">
        <select
          className="month"
          value={month}
          onChange={(e) => {
            dispatch({
              type: "SET_MONTH",
              payload: e.target.value,
            });
          }}
        >
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
