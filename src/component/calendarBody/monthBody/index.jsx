import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemContainer, { Type } from "component/calendarBody/itemContainer";
import { switchDate } from "redux/slice/dateSlice";
import { changeMode } from "redux/slice/calendarSlice";
import { CalendarMode } from "constant/calendar";

const Month = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

function MonthBody() {
  const dispatch = useDispatch();

  const selectedDate = useSelector((state) => state.date.selectedDate);
  const { month: selectedMonth } = selectedDate;

  const renderType = useCallback(
    (month) => {
      if (month === selectedMonth) {
        return Type.Selected;
      }

      return Type.Normal;
    },
    [selectedMonth]
  );

  const renderMonth = useMemo(() => {
    let count = 0;
    let tempGroup = [];
    const group = Object.keys(Month).reduce((result, monthNum) => {
      count++;
      tempGroup.push(+monthNum);
      if (count >= 4) {
        result.push(tempGroup);
        count = 0;
        tempGroup = [];
      }
      return result;
    }, []);

    return group.map((row, rowIndex) => (
      <div key={`month-row-${rowIndex}`} className="flex justify-between my-3">
        {row.map((month, monthIndex) => (
          <ItemContainer
            key={`item-${monthIndex}`}
            type={renderType(month)}
            clickable
            onClick={() => {
              dispatch(switchDate({ ...selectedDate, month, day: 1 }));
              dispatch(changeMode(CalendarMode.Date));
            }}
          >
            {Month[month]}
          </ItemContainer>
        ))}
      </div>
    ));
  }, [renderType]);

  return <div className="px-3">{renderMonth}</div>;
}

export default MonthBody;
