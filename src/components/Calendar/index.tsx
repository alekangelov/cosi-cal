import React from "react";
import { useCalendarContext } from "../../lib/contexts";
import Select, { StylesConfig } from "react-select";

export default function Calendar() {
  const { months } = useCalendarContext();
  return (
    <div className="header">
      <select className="month">
        {months?.map((e, i) => (
          <option key={e.value + "option"} value={e.value}>
            {e.label}
          </option>
        ))}
      </select>
      <div className="controls">menu</div>
    </div>
  );
}
