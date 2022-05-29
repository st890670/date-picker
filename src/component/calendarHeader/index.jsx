import DateHeader from "component/calendarHeader/dateHeader";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CalendarMode } from "constant/calendar";

function CalendarHeader() {
  const { mode } = useSelector((state) => state.calendar);
  const renderHeader = useMemo(() => {
    switch (mode) {
      case CalendarMode.Date:
        return <DateHeader />;
      default:
        return <></>;
    }
  }, [mode]);

  return (
    <div className="w-full flex justify-between items-center px-3 py-3">
      {renderHeader}
    </div>
  );
}

export default CalendarHeader;
