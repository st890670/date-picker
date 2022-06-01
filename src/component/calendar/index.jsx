import CalendarMain from "component/calendar/calendarMain";
import { CalendarContext } from "component/calendar/context";

function Calendar({
  defaultDate = new Date(),
  onSelectDate = () => {},
  onInputChange = () => {},
  inputContainerClass = "",
  calendarContainerClass = "",
}) {
  return (
    <CalendarContext.Provider
      value={{
        defaultDate,
        onSelectDate,
        onInputChange,
        inputContainerClass,
        calendarContainerClass,
      }}
    >
      <CalendarMain />
    </CalendarContext.Provider>
  );
}

export default Calendar;
