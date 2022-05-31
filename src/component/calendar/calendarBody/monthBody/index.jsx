import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemContainer, {
  Type,
} from "component/calendar/calendarBody/itemContainer";
import { switchDate } from "redux/slice/dateSlice";
import { changeMode } from "redux/slice/calendarSlice";
import { CalendarMode } from "constant/calendar";
import { MonthMapping } from "constant/date";

function MonthBody() {
  const dispatch = useDispatch();

  const { selectedDate, relatedMonth } = useSelector((state) => state.date);
  const { month: selectedMonth, year: selectedYear } = selectedDate;

  const renderType = useCallback(
    (year, month) => {
      if (year === selectedYear && month === selectedMonth) {
        return Type.Selected;
      }

      return Type.Normal;
    },
    [selectedYear, selectedMonth]
  );

  const renderMonth = useMemo(() => {
    let count = 0;
    let tempGroup = [];
    const group = relatedMonth.reduce((result, obj) => {
      count++;
      tempGroup.push(obj);
      if (count >= 4) {
        result.push(tempGroup);
        count = 0;
        tempGroup = [];
      }
      return result;
    }, []);

    return group.map((row, rowIndex) => (
      <div key={`month-row-${rowIndex}`} className="flex justify-between my-3">
        {row.map(({ year, month }, itemIndex) => (
          <ItemContainer
            key={`item-${itemIndex}`}
            type={renderType(year, month)}
            clickable
            onClick={() => {
              dispatch(switchDate({ year, month, day: 1 }));
              dispatch(changeMode(CalendarMode.Date));
            }}
          >
            {MonthMapping[month]}
          </ItemContainer>
        ))}
      </div>
    ));
  }, [dispatch, relatedMonth, renderType]);

  return <div className="px-3">{renderMonth}</div>;
}

export default MonthBody;
