import React, { Props, FunctionComponent } from "react";
import { useSpring, a } from "react-spring";
type AddEventProps = {
  active: boolean;
};

const AddEvent: FunctionComponent<AddEventProps> = ({ active }) => {
  const style = useSpring({
    display: active ? "block" : "none",
    opacity: active ? 1 : 0,
    transform: active ? "translate(-50%,-50%)" : "translate(-50%,-100%)",
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
