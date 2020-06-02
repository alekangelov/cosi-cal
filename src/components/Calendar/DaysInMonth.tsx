import React, { FunctionComponent } from "react";
import { useCalendarContext, useCalendarDispatch } from "../../lib/contexts";
import moment from "moment";

const SingleEvent = (props: any) => {
  const dispatch = useCalendarDispatch();
  return (
    <button
      onClick={() =>
        dispatch({
          type: "ADD_INVIEW",
          payload: props.event,
        })
      }
      className="events-single"
    ></button>
  );
};

const DaysInMonth: FunctionComponent = (props) => {
  const { daysInMonth, events, date } = useCalendarContext();

  return (
    <>
      {Array(daysInMonth)
        .fill(0)
        .map((e, i) => {
          const singleDate = i + 1;
          const cellDate = date?.set("date", singleDate);
          const eventsHere = events?.filter((e, i) => {
            const eventDate = moment(e.date, "YYYY MM DD");
            return (
              cellDate?.format("YYYY MM DD") === eventDate.format("YYYY MM DD")
            );
          });
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
export { DaysInMonth };
