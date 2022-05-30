import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemContainer, {
  Type,
} from "component/calendar/calendarBody/itemContainer";
import { switchDate } from "redux/slice/dateSlice";
import { changeMode } from "redux/slice/calendarSlice";
import { CalendarMode } from "constant/calendar";

function YearBody() {
  const dispatch = useDispatch();

  const { selectedDate, relatedYear } = useSelector((state) => state.date);
  const { year: selectedYear } = selectedDate;

  const renderType = useCallback(
    (year) => {
      if (year === selectedYear) {
        return Type.Selected;
      }

      return Type.Normal;
    },
    [selectedYear]
  );

  const renderYear = useMemo(() => {
    let count = 0;
    let tempGroup = [];
    const group = relatedYear.reduce((result, monthNum) => {
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
        {row.map((year, yearIndex) => (
          <ItemContainer
            key={`item-${yearIndex}`}
            type={renderType(year)}
            clickable
            onClick={() => {
              dispatch(switchDate({ ...selectedDate, year, day: 1 }));
              dispatch(changeMode(CalendarMode.Month));
            }}
          >
            {year}
          </ItemContainer>
        ))}
      </div>
    ));
  }, [dispatch, selectedDate, relatedYear, renderType]);

  return <div className="px-3">{renderYear}</div>;
}

export default YearBody;
