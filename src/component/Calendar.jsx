import React, { createContext, useContext, useMemo } from "react";
import useCalendar from "../hooks/useCalendar";

const CalendarContext = createContext();

function Calendar({ children }) {
  const { weekdays, headers, prevDays, currentDays, nextDays, view, current } =
    useCalendar();

  return (
    <CalendarContext.Provider
      value={{ weekdays, headers, prevDays, currentDays, nextDays, view, current }}
    >
      <div
        style={{
          width: "500px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </CalendarContext.Provider>
  );
}

const Header = () => {
  const { current } = useContext(CalendarContext);
  return (
    <div style={{ display: "flex", fontWeight: "bold" }}>
      {current?.year}. {current?.month}
    </div>
  );
};

const WeekDays = () => {
  const { weekdays } = useContext(CalendarContext);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        margin: "10px",
      }}
    >
      {weekdays.map((value, index) => (
        <div
          style={{ width: "calc(100% / 7)", textAlign: "center" }}
          key={index}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

const Body = () => {
  const { prevDays, currentDays, nextDays } = useContext(CalendarContext);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-between",
        margin: "10px",
      }}
    >
      {prevDays.map((value, index) => (
        <div className="days" key={index}>
          {value}
        </div>
      ))}
      {currentDays.map((value, index) => (
        <div className="days" key={index}>
          {value}
        </div>
      ))}
      {nextDays.map((value, index) => (
        <div className="days" key={index}>
          {value}
        </div>
      ))}
    </div>
  );
};

Calendar.Header = Header;
Calendar.WeekDays = WeekDays;
Calendar.Body = Body;

export default Calendar;
