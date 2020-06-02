import React, { FunctionComponent } from "react";
import { useSpring, a } from "react-spring";
import { useFormik } from "formik";
import { AddIcon } from "../Icons";
import { useCalendarDispatch } from "../../lib/contexts";
import shortid from "shortid";
type AddEventProps = {
  active: boolean;
  event?: Event | undefined;
  toggle?: () => void | undefined;
};

const AddEvent: FunctionComponent<AddEventProps> = ({ active, toggle }) => {
  const dispatch = useCalendarDispatch();
  const style = useSpring({
    to: async (next: any, cancel: any) => {
      if (!active) {
        await next({ opacity: 0, transform: "translate(-50%,0%)" });
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
  const backgroundStyle = useSpring({
    to: async (next: any, cancel: any) => {
      if (!active) {
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
  const formik = useFormik({
    initialValues: {
      id: shortid.generate(),
      title: "",
      description: "",
      date: "",
    },
    onSubmit: (values) => {
      formik.resetForm();
      dispatch({
        type: "ADD_EVENT",
        payload: values,
      });
    },
  });
  console.log(style);
  return (
    <>
      <a.div style={backgroundStyle} className="add-event_background"></a.div>
      <a.div style={style} className="add-event">
        <button onClick={toggle} className="add-event__exit">
          <AddIcon />
        </button>
        <form onSubmit={formik.handleSubmit} className="form">
          <input type="hidden" value={formik.values.id} />
          <div className="form-group">
            <input
              value={formik.values.title}
              onChange={formik.handleChange}
              name="title"
              type="text"
              placeholder="title"
            ></input>
          </div>
          <div className="form-group">
            <textarea
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
            ></textarea>
          </div>
          <div className="form-group">
            <input
              value={formik.values.date}
              onChange={formik.handleChange}
              name="date"
              type="date"
            />
          </div>
          <div className="form-group">
            <button type="submit">Add Event</button>
          </div>
        </form>
      </a.div>
    </>
  );
};

export default AddEvent;
