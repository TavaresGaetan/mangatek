import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";

const AnimeCalendar = () => {
  const [value, onChange] = React.useState(new Date());

  const tileClassName = ({ activeStartDate, date, view }) => {
    if (view === "month" && date.getDate() === 5) {
      console.log("coucou?");
      return "calendar-day-event";
    }
    return null;
  };

  return (
    <div>
      <Calendar
        tileClassName={tileClassName}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AnimeCalendar;
