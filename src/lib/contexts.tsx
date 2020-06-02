import React, { createContext, useContext, Props, useReducer } from "react";
import moment, { Moment } from "moment";
export type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
};
type Option = { label: string; value: string };

type CalendarContextProps = {
  date: Moment;
  months: Option[];
  events: Event[] | [];
  days: string[];
  month?: string;
  daysInMonth?: number;
  currentDate?: number;
  currentDay?: string;
  firstDay?: number;
};

type CalendarDispatchProps = () => void;

export const CalendarContext = createContext<Partial<CalendarContextProps>>({});
export const CalendarDispatchContext = createContext((props: Action) => {});

type Action = {
  type: "ADD_EVENT" | "REMOVE_EVENT";
  payload: Event;
};

function calendarReducer(state: CalendarContextProps, action: Action) {
  switch (action.type) {
    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "REMOVE_EVENT":
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
  events: [
    {
      id: "2ASoB537nR",
      title: "asd",
      description: "asdasd",
      date: "2020-06-12",
    },
  ],
  days: moment.weekdays(),
};

export function CalendarProvider<T>(props: Props<T>) {
  const [state, dispatch] = useReducer(calendarReducer, {
    ...initialState,
  });
  console.log(state);
  return (
    <CalendarContext.Provider
      value={{
        ...state,
        month: state.date.format("MMMM"),
        currentDate: state.date.get("date"),
        currentDay: state.date.format("D"),
        daysInMonth: state.date.daysInMonth(),
        firstDay: parseInt(state.date.startOf("month").format("d")) - 1,
      }}
    >
      <CalendarDispatchContext.Provider value={dispatch}>
        {props.children}
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  );
}
