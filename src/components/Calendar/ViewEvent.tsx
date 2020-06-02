import React, { FunctionComponent } from "react";
import { useSpring, a } from "react-spring";
import { AddIcon } from "../Icons";
import { useCalendarContext, useCalendarDispatch } from "../../lib/contexts";
import moment from "moment";

const ViewEvent: FunctionComponent = (props: any) => {
  const { inViewEvent } = useCalendarContext();
  const dispatch = useCalendarDispatch();
  const backgroundStyle = useSpring({
    to: async (next: any, cancel: any) => {
      if (!inViewEvent) {
        await next({ opacity: 0 });
        await next({ display: "none" });
        return;
      }
      return next({
        display: "block",
        opacity: 1,
      });
    },
  });
  const style = useSpring({
    to: async (next: any, cancel: any) => {
      if (!inViewEvent) {
        await next({
          display: "none",
          opacity: 0,
          transform: "translate(-50%,50%)",
        });
        return;
      }
      return await next({
        display: "block",
        opacity: 1,
        transform: "translate(-50%,-50%)",
      });
    },
  });
  return (
    <>
      {" "}
      <a.div style={backgroundStyle} className="add-event_background"></a.div>
      <a.div style={style} className="add-event">
        <button
          className="add-event__exit"
          onClick={() => dispatch({ type: "REMOVE_INVIEW" })}
        >
          <AddIcon />
        </button>
        <div className="add-event_inner">
          <h2>{inViewEvent?.title}</h2>
          <p>{inViewEvent?.description}</p>
          <h4>
            {moment(inViewEvent?.date, "YYYY-MM-DD").format("MMMM Do YYYY")}
          </h4>
          <div className="form-group">
            <button
              className="remove"
              onClick={() =>
                dispatch({
                  type: "REMOVE_EVENT",
                  payload: inViewEvent ? inViewEvent : undefined,
                })
              }
            >
              Remove
            </button>
          </div>
        </div>
      </a.div>{" "}
    </>
  );
};

export default ViewEvent;
