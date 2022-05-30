import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { plusMonth } from "redux/slice/dateSlice";
import { changeMode } from "redux/slice/calendarSlice";
import { CalendarMode } from "constant/calendar";

function MonthHeader({ onTitleClick = () => {} }) {
  const dispatch = useDispatch();
  const { year } = useSelector((state) => state.date.selectedDate);

  const handleClickPrev = useCallback(() => {
    dispatch(plusMonth(-1));
    dispatch(changeMode(CalendarMode.Date));
  }, [dispatch]);

  const handleClickNext = useCallback(() => {
    dispatch(plusMonth(1));
    dispatch(changeMode(CalendarMode.Date));
  }, [dispatch]);

  return (
    <>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleLeft}
        onClick={handleClickPrev}
      />
      <div className="cursor-pointer" onClick={onTitleClick}>
        {year}
      </div>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleRight}
        onClick={handleClickNext}
      />
    </>
  );
}

export default MonthHeader;
