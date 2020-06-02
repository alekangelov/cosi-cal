import React, { FunctionComponent } from "react";
import { useSpring, a } from "react-spring";
import { useFormik } from "formik";
import { AddIcon } from "../Icons";
import { useCalendarDispatch } from "../../lib/contexts";
import shortid from "shortid";
import * as Yup from "yup";

type AddEventProps = {
  active: boolean;
  toggle: () => void;
};

const EventValidation = Yup.object().shape({
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This is required!"),
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This is required!"),
  date: Yup.string().required("This is required!"),
  id: Yup.string().required("This is required!"),
});

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
    validationSchema: EventValidation,
    onSubmit: (values) => {
      toggle();
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
            {formik.errors.title && (
              <div className="error">
                <p>{formik.errors.title}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <textarea
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
            ></textarea>
            {formik.errors.description && (
              <div className="error">
                <p>{formik.errors.description}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              value={formik.values.date}
              onChange={formik.handleChange}
              name="date"
              type="date"
            />
            {formik.errors.date && (
              <div className="error">
                <p>{formik.errors.date}</p>
              </div>
            )}
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
