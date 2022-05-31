import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupDate } from "redux/slice/dateSlice";
import { expandCalendar } from "redux/slice/calendarSlice";
import CalendarHeader from "component/calendar/calendarHeader";
import CalendarBody from "component/calendar/calendarBody";
import CalendarContext from "component/calendar/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const InputType = {
  Year: "year",
  Month: "month",
  Day: "day",
};

function CalendarMain() {
  const dispatch = useDispatch();
  const showCalendar = useSelector((state) => state.calendar.show);
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const { defaultDate } = useContext(CalendarContext);
  const [input, setInput] = useState({
    [InputType.Year]: "",
    [InputType.Month]: "",
    [InputType.Day]: "",
  });

  useEffect(() => {
    dispatch(setupDate(defaultDate));
  }, [dispatch, defaultDate]);

  useEffect(() => {
    const { year, month, day } = selectedDate;
    if (year && month && day) {
      setInput({
        year,
        month,
        day,
      });
    }
  }, [selectedDate]);

  const isValidDate = (year, month, day, targetDate) => {
    const date = new Date(targetDate);
    return (
      targetDate instanceof Date &&
      !isNaN(targetDate) &&
      date.getFullYear() === +year &&
      date.getMonth() + 1 === +month &&
      date.getDate() === +day
    );
  };

  const handleInputChange = useCallback(
    (event, type) => {
      const value = event.target.value;

      setInput((prev) => {
        const clone = { ...prev };
        clone[type] = value;

        const year = clone[InputType.Year] ? clone[InputType.Year] : -1;
        const month = clone[InputType.Month] ? clone[InputType.Month] : -1;
        const day = clone[InputType.Day] ? clone[InputType.Day] : -1;
        const newDate = new Date(`${year}-${month}-${day}`);
        if (isValidDate(year, month, day, newDate)) {
          dispatch(setupDate(newDate));
        }

        return clone;
      });
    },
    [dispatch]
  );

  return (
    <div className="p-2">
      <div
        className={`flex items-center border w-fit px-2 py-1 rounded mb-0.5 ${
          showCalendar ? "border-[#83C5BE]" : "border-[#c5c5c5]"
        }`}
        onFocus={() => dispatch(expandCalendar(true))}
      >
        <FontAwesomeIcon
          className={`mr-2 ${
            showCalendar ? "text-[#83C5BE]" : "text-[#c5c5c5]"
          }`}
          icon={faCalendarDays}
        />
        <input
          className="w-10 text-center focus:outline-none"
          maxLength={4}
          value={input.year}
          onChange={(e) => handleInputChange(e, InputType.Year)}
        />
        -
        <input
          className="w-6 text-center focus:outline-none"
          maxLength={2}
          value={input.month}
          onChange={(e) => handleInputChange(e, InputType.Month)}
        />
        -
        <input
          className="w-6 text-center focus:outline-none"
          maxLength={2}
          value={input.day}
          onChange={(e) => handleInputChange(e, InputType.Day)}
        />
      </div>
      {showCalendar && (
        <div className="md:border md:border-[#cdcdcd] md:w-96 w-full">
          <CalendarHeader />
          <CalendarBody />
        </div>
      )}
    </div>
  );
}

export default CalendarMain;
