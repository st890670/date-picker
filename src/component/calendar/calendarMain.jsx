import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { setupDate } from "redux/slice/dateSlice";
import { expandCalendar } from "redux/slice/calendarSlice";
import CalendarHeader from "component/calendar/calendarHeader";
import CalendarBody from "component/calendar/calendarBody";
import CalendarContext from "component/calendar/context";
import { fillNumberToTens, isValidDate } from "util/dateUtil";

const InputType = {
  Year: "year",
  Month: "month",
  Day: "day",
};

function CalendarMain() {
  const dispatch = useDispatch();
  const showCalendar = useSelector((state) => state.calendar.show);
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const {
    defaultDate,
    onInputChange,
    inputContainerClass,
    calendarContainerClass,
  } = useContext(CalendarContext);
  const [prevValidDate, setPrevValidDate] = useState({
    [InputType.Year]: "",
    [InputType.Month]: "",
    [InputType.Day]: "",
  });
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
    if (!year || !month || !day) {
      return;
    }

    const isoDateObj = {
      [InputType.Year]: `${year}`,
      [InputType.Month]: fillNumberToTens(month),
      [InputType.Day]: fillNumberToTens(day),
    };

    setInput({ ...isoDateObj });
    setPrevValidDate({ ...isoDateObj });
    onInputChange({ ...isoDateObj });
  }, [selectedDate, onInputChange]);

  const handleInputChange = useCallback((event, type) => {
    const value = event.target.value;
    setInput((prev) => {
      const clone = { ...prev };
      clone[type] = value;
      return clone;
    });
  }, []);

  const checkValidAndChangeDate = useCallback(
    (type) => {
      const { year, month, day } = input;
      const { year: prevYear, month: prevMonth, day: prevDay } = prevValidDate;
      if (year === prevYear && month === prevMonth && day === prevDay) {
        return;
      }
      if (isValidDate(year, month, day)) {
        setPrevValidDate((prev) => ({ ...prev, [type]: input[type] }));
        dispatch(setupDate(new Date(`${year}/${month}/${day}`)));
      } else {
        setInput((prev) => ({ ...prev, [type]: prevValidDate[type] }));
      }
    },
    [dispatch, prevValidDate, input]
  );

  return (
    <div className="p-2">
      <div
        className={`flex items-center border w-fit px-2 py-1 rounded mb-0.5 ${
          showCalendar ? `border-[#83C5BE]` : "border-[#c5c5c5]"
        } ${inputContainerClass}`}
        onFocus={() => dispatch(expandCalendar(true))}
      >
        <FontAwesomeIcon
          className={`mr-2 ${
            showCalendar ? `text-[#83C5BE]` : "text-[#c5c5c5]"
          }`}
          icon={faCalendarDays}
        />
        <input
          className="w-10 text-center focus:outline-none"
          maxLength={4}
          value={input.year}
          onChange={(e) => handleInputChange(e, InputType.Year)}
          onBlur={() => checkValidAndChangeDate(InputType.Year)}
        />
        -
        <input
          className="w-6 text-center focus:outline-none"
          maxLength={2}
          value={input.month}
          onChange={(e) => handleInputChange(e, InputType.Month)}
          onBlur={() => checkValidAndChangeDate(InputType.Month)}
        />
        -
        <input
          className="w-6 text-center focus:outline-none"
          maxLength={2}
          value={input.day}
          onChange={(e) => handleInputChange(e, InputType.Day)}
          onBlur={() => checkValidAndChangeDate(InputType.Day)}
        />
      </div>
      {showCalendar && (
        <div
          className={`md:border md:border-[#cdcdcd] md:w-96 w-full ${calendarContainerClass}`}
        >
          <CalendarHeader />
          <CalendarBody />
        </div>
      )}
    </div>
  );
}

export default CalendarMain;
