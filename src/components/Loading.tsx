import React from "react";
import { useCalendarContext } from "../lib/contexts";
import { useSpring, a } from "react-spring";

export default function Loading() {
  const { months } = useCalendarContext();
  const style = useSpring({
    to: async (next: any, cancel: any) => {
      if (months?.length) {
        await next({ opacity: Boolean(months?.length) ? 0 : 1, delay: 1 });
        await next({ display: "none" });
      }
    },
  });
  return (
    <a.div style={style} className="loading">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </a.div>
  );
}
