import React, {
  createContext,
  useContext,
  Props,
  useReducer,
  useRef,
} from "react";
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
  inViewEvent: Event | null;
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
  type:
    | "ADD_EVENT"
    | "REMOVE_EVENT"
    | "ADD_INVIEW"
    | "REMOVE_INVIEW"
    | "SET_MONTH";
  payload?: Event | string;
};

function calendarReducer(
  state: CalendarContextProps,
  action: Action
): CalendarContextProps {
  switch (action.type) {
    case "ADD_EVENT":
      return {
        ...state,
        events:
          action.payload && typeof action.payload !== "string"
            ? [...state.events, action.payload]
            : state.events,
      };
    case "ADD_INVIEW":
      return {
        ...state,
        inViewEvent:
          action.payload && typeof action.payload !== "string"
            ? action.payload
            : null,
      };
    case "SET_MONTH":
      return {
        ...state,
        date:
          typeof action.payload === "string"
            ? moment().month(action.payload)
            : moment(),
      };
    case "REMOVE_INVIEW":
      return {
        ...state,
        inViewEvent: null,
      };
    case "REMOVE_EVENT":
      return {
        ...state,
        events: state.events.filter((e) => {
          return (
            e?.id !==
            (typeof action.payload !== "string" ? action.payload?.id : 0)
          );
        }),
        inViewEvent: null,
      };
    default:
      return state;
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
  inViewEvent: null,
  events: [
    {
      id: "2ASoB537nR",
      title: "asd",
      description: "asdasd",
      date: "2020-06-12",
    },
    {
      id: "2ASos537nR",
      title: "asd",
      description: "asdasd",
      date: "2020-06-12",
    },
    {
      id: "2ASod537nR",
      title: "asd",
      description: "asdasd",
      date: "2020-06-12",
    },
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
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
        firstDay: parseInt(state.date.startOf("month").format("d")),
      }}
    >
      <CalendarDispatchContext.Provider value={dispatch}>
        {props.children}
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  );
}
