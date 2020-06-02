import React from "react";
import { CalendarProvider } from "./lib/contexts";
import Calendar from "./components/Calendar";
import Loading from "./components/Loading";

function App() {
  return (
    <CalendarProvider>
      <Loading />
      <Calendar />
    </CalendarProvider>
  );
}

export default App;
