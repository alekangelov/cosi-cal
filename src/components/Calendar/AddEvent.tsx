import React, { Props, FunctionComponent } from "react";

type AddEventProps = {
  active: boolean;
};

const AddEvent: FunctionComponent<AddEventProps> = (props) => {
  console.log(props.active);
  return <div className="add-event"></div>;
};

export default AddEvent;
