import DateHeader from "component/calendarHeader/dateHeader";
import { useMemo } from "react";

const Type = {
  DateHeader: "dateHeader",
  MonthHeader: "monthHeader",
  YearHeader: "yearHeader",
};

function CalendarHeader({ type }) {
  const renderHeader = useMemo(() => {
    switch (type) {
      case Type.DateHeader:
        return <DateHeader></DateHeader>;

      default:
        return <></>;
    }
  }, [type]);

  return (
    <div className="w-full flex justify-between items-center px-1 py-3">
      {renderHeader}
    </div>
  );
}

export { Type };
export default CalendarHeader;
