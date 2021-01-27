import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";

const AnimeCalendar = () => {
  const [value, onChange] = React.useState(new Date());
  const [display, setDisplay] = React.useState(false);

  const tileClassName = ({ activeStartDate, date, view }) => {
    if (view === "month" && date.getDate() === 5) {
      return "calendar-day-event";
    }
    return null;
  };

  const handleClickDay = (value, event) => {
    if (value.getDate() === 5) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  return (
    <div>
      <Calendar
        tileClassName={tileClassName}
        value={value}
        onChange={onChange}
        onClickDay={handleClickDay}
      />
      {display ? (
        <div>
          <p>Boruto</p>
          <p>Fire Force</p>
        </div>
      ) : null}
    </div>
  );
};

export default AnimeCalendar;
