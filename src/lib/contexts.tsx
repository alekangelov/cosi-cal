import React, {
  createContext,
  useContext,
  Props,
  useState,
  useRef,
  useReducer,
  Reducer,
} from "react";
import moment, { Moment } from "moment";

interface Event {
  id: string;
  name: string;
  date: Date;
}
type Option = { label: string; value: string };

type CalendarContextProps = {
  date: Moment;
  months: Option[];
  events: Event[] | [];
  days: string[];
  month: string;
  daysInMonth: number;
  currentDate: number;
  currentDay: string;
  firstDay: number;
};

export const CalendarContext = createContext<Partial<CalendarContextProps>>({});
export const CalendarDispatchContext = createContext({});

type Action = {
  type: "add" | "remove";
  payload: Event;
};

function calendarReducer(state: CalendarContextProps, action: Action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "remove":
      return {
        ...state,
        events: state.events.filter((e) => {
          return e?.id;
        }),
      };
    default:
      return { ...state };
  }
}

export function useCalendarContext() {
  return useContext(CalendarContext);
}

export function useCalendarDispatch() {
  return useContext(CalendarDispatchContext);
}

const initialState: CalendarContextProps = {
  date: moment(),
  months: moment.months().map((e) => ({ label: e, value: e })),
  events: [],
  days: moment.weekdays(),
  month: moment().format("MMMM"),
  currentDate: moment().get("date"),
  currentDay: moment().format("D"),
  daysInMonth: moment().daysInMonth(),
  firstDay: parseInt(moment().startOf("month").format("d")) - 1,
};

export function CalendarProvider<T>(props: Props<T>) {
  const [state, dispatch] = useReducer(calendarReducer, {
    ...initialState,
  });
  console.log(state);
  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {props.children}
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  );
}
