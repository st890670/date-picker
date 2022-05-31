import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { prevMonth, nextMonth } from "redux/slice/dateSlice";
import { MonthMapping } from "constant/date";

function DateHeader({ onTitleClick = () => {} }) {
  const dispatch = useDispatch();
  const { target } = useSelector((state) => state.date.relatedDate);
  const { year, month } = target;

  const handleClickPrev = useCallback(() => {
    dispatch(prevMonth());
  }, [dispatch]);

  const handleClickNext = useCallback(() => {
    dispatch(nextMonth());
  }, [dispatch]);

  return (
    <>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleLeft}
        onClick={handleClickPrev}
      />
      <div
        className="cursor-pointer"
        onClick={onTitleClick}
      >{`${MonthMapping[month]} ${year}`}</div>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleRight}
        onClick={handleClickNext}
      />
    </>
  );
}

export default DateHeader;
