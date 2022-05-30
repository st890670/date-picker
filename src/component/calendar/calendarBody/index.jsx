import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CalendarMode } from "constant/calendar";
import DateBody from "component/calendar/calendarBody/dateBody";
import MonthBody from "component/calendar/calendarBody/monthBody";
import YearBody from "component/calendar/calendarBody/yearBody";

function CalendarBody() {
  const { mode } = useSelector((state) => state.calendar);

  const renderBody = useMemo(() => {
    switch (mode) {
      case CalendarMode.Date:
        return <DateBody />;
      case CalendarMode.Month:
        return <MonthBody />;
      case CalendarMode.Year:
        return <YearBody />;
      default:
        return <></>;
    }
  }, [mode]);

  return <div className="w-full">{renderBody}</div>;
}

export default CalendarBody;
