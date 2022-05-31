import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setupDate } from "redux/slice/dateSlice";
import CalendarHeader from "component/calendar/calendarHeader";
import CalendarBody from "component/calendar/calendarBody";
import CalendarContext from "component/calendar/context";

function CalendarMain() {
  const { defaultDate } = useContext(CalendarContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setupDate(defaultDate));
  }, [dispatch, defaultDate]);

  return (
    <div className="p-2 md:border md:border-[#cdcdcd] md:w-96 w-full md:m-2">
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}

export default CalendarMain;
