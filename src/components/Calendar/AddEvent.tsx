import React, { FunctionComponent } from "react";
import { useSpring, a } from "react-spring";
type AddEventProps = {
  active: boolean;
};

const AddEvent: FunctionComponent<AddEventProps> = ({ active }) => {
  const style = useSpring({
    to: async (next: any, cancel: any) => {
      if (!active) {
        await next({ opacity: 0, transform: "translate(-50%,-100%)" });
        await next({ display: "none" });
        return;
      }
      return next({
        display: "block",
        opacity: 1,
        transform: "translate(-50%,-50%)",
      });
    },
  });
  return (
    <a.div style={style} className="add-event">
      <form className="form">
        <div className="form-group">
          <input type="text" placeholder="title"></input>
        </div>
        <div className="form-group">
          <textarea>Description</textarea>
        </div>
      </form>
    </a.div>
  );
};

export default AddEvent;
