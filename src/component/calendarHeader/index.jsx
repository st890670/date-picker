import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarMode } from "constant/calendar";
import { changeMode } from "redux/slice/calendarSlice";
import DateHeader from "component/calendarHeader/dateHeader";
import MonthHeader from "component/calendarHeader/monthHeader";
import YearHeader from "component/calendarHeader/yearHeader";

function CalendarHeader() {
  const { mode } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const swichMode = useCallback(
    (mode) => {
      dispatch(changeMode(mode));
    },
    [dispatch]
  );

  const renderHeader = useMemo(() => {
    switch (mode) {
      case CalendarMode.Date:
        return (
          <DateHeader onTitleClick={() => swichMode(CalendarMode.Month)} />
        );
      case CalendarMode.Month:
        return (
          <MonthHeader onTitleClick={() => swichMode(CalendarMode.Year)} />
        );
      case CalendarMode.Year:
        return <YearHeader />;
      default:
        return <></>;
    }
  }, [swichMode, mode]);

  return (
    <div className="w-full flex justify-between items-center px-3 py-3">
      {renderHeader}
    </div>
  );
}

export default CalendarHeader;
