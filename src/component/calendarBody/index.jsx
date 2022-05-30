import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CalendarMode } from "constant/calendar";
import DateBody from "component/calendarBody/dateBody";
import MonthBody from "component/calendarBody/monthBody";

function CalendarBody() {
  const { mode } = useSelector((state) => state.calendar);

  const renderBody = useMemo(() => {
    switch (mode) {
      case CalendarMode.Date:
        return <DateBody />;
      case CalendarMode.Month:
        return <MonthBody />;
      default:
        return <></>;
    }
  }, [mode]);

  return <div className="w-full">{renderBody}</div>;
}

export default CalendarBody;
