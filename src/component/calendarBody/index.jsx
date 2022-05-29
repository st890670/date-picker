import { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DayItem, { Type } from "./dayItem";
import WeekBar from "./weekBar";
import { switchDate } from "redux/slice/dateSlice";

function CalendarBody() {
  const dispatch = useDispatch();
  const { currentDate, selectedDate, relatedDate } = useSelector(
    (state) => state.date
  );
  const [dateGroup, setDateGroup] = useState([]);

  const arrangeGroup = useCallback(() => {
    if (!relatedDate.length) {
      return;
    }

    let tempCount = 0;
    let tempGroup = [];
    const group = relatedDate.reduce((result, date) => {
      tempCount++;
      tempGroup.push(date);
      if (tempCount >= 7) {
        result.push(tempGroup);
        tempCount = 0;
        tempGroup = [];
      }
      return result;
    }, []);

    setDateGroup(group);
  }, [relatedDate]);

  useEffect(() => {
    arrangeGroup();
  }, [arrangeGroup]);

  const calculateDateType = useCallback(
    ({ year, month, day }) => {
      const isCurrentDateToday =
        currentDate.year === year &&
        currentDate.month === month &&
        currentDate.day === day;
      const isSelectedDateToday =
        selectedDate.year === currentDate.year &&
        selectedDate.month === currentDate.month &&
        selectedDate.day === currentDate.day;
      const isDateSelectedDate =
        selectedDate.year === year &&
        selectedDate.month === month &&
        selectedDate.day === day;
      const isDateOutofSelectedMonth = month !== selectedDate.month;

      if (isCurrentDateToday && !isSelectedDateToday) {
        return Type.TodayWithoutSelected;
      }

      if (isDateSelectedDate) {
        return Type.Selected;
      }

      if (isDateOutofSelectedMonth) {
        return Type.Disabled;
      }

      return Type.Normal;
    },
    [currentDate, selectedDate]
  );

  const renderDate = useMemo(() => {
    if (!dateGroup.length) {
      return <></>;
    }
    return dateGroup.map((group, groupIndex) => (
      <div key={`row-${groupIndex}`} className="flex justify-between">
        {group.map((date) => (
          <DayItem
            key={`${date.year}-${date.month}-${date.day}`}
            type={calculateDateType(date)}
            onClick={() => dispatch(switchDate(date))}
          >
            {date.day}
          </DayItem>
        ))}
      </div>
    ));
  }, [dispatch, dateGroup, calculateDateType]);

  return (
    <div className="w-full">
      <WeekBar />
      {renderDate}
    </div>
  );
}

export default CalendarBody;
