import CalendarMain from "component/calendar/calendarMain";
import { CalendarContext } from "component/calendar/context";

function Calendar({ defaultDate = new Date(), onSelectDate = () => {} }) {
  return (
    <CalendarContext.Provider
      value={{
        defaultDate,
        onSelectDate,
      }}
    >
      <CalendarMain />
    </CalendarContext.Provider>
  );
}

export default Calendar;
