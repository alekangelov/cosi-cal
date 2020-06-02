import React, { FunctionComponent } from "react";
import { useSpring, a } from "react-spring";
import { AddIcon } from "../Icons";
import { useCalendarDispatch } from "../../lib/contexts";

const ViewEvent: FunctionComponent = (props: any) => {
  return (
    <a.div className="add-event">
      <button className="add-event__exit">
        <AddIcon />
      </button>
    </a.div>
  );
};

export default ViewEvent;
