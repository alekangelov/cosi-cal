import React from "react";
import { CalendarProvider } from "./lib/contexts";
import Calendar from "./components/Calendar";

function App() {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

export default App;
