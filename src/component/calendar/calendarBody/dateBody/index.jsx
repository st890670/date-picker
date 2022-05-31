import { useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeekBar from "component/calendar/calendarBody/dateBody/weekBar";
import ItemContainer, {
  Type,
} from "component/calendar/calendarBody/itemContainer";
import { switchDate } from "redux/slice/dateSlice";
import CalendarContext from "component/calendar/context";

function DateBody() {
  const { onSelectDate } = useContext(CalendarContext);
  const dispatch = useDispatch();
  const { currentDate, selectedDate, relatedDate } = useSelector(
    (state) => state.date
  );

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
      const isDateOutofSelectedMonth =
        month !== relatedDate.target.month || year !== relatedDate.target.year;

      if (isCurrentDateToday && !isSelectedDateToday) {
        return Type.Highlight;
      }

      if (isDateSelectedDate) {
        return Type.Selected;
      }

      if (isDateOutofSelectedMonth) {
        return Type.Disabled;
      }

      return Type.Normal;
    },
    [relatedDate, currentDate, selectedDate]
  );

  const renderRelatedDate = useMemo(() => {
    if (!relatedDate.payload.length) {
      return <></>;
    }

    let tempCount = 0;
    let tempGroup = [];
    const group = relatedDate.payload.reduce((result, date) => {
      tempCount++;
      tempGroup.push(date);
      if (tempCount >= 7) {
        result.push(tempGroup);
        tempCount = 0;
        tempGroup = [];
      }
      return result;
    }, []);

    return group.map((group, groupIndex) => (
      <div key={`row-${groupIndex}`} className="flex justify-between">
        {group.map((date) => (
          <ItemContainer
            key={`${date.year}-${date.month}-${date.day}`}
            type={calculateDateType(date)}
            clickable
            onClick={() => {
              dispatch(switchDate(date));
              onSelectDate(date);
            }}
          >
            {date.day}
          </ItemContainer>
        ))}
      </div>
    ));
  }, [dispatch, relatedDate, calculateDateType, onSelectDate]);

  return (
    <>
      <WeekBar />
      {renderRelatedDate}
    </>
  );
}

export default DateBody;
