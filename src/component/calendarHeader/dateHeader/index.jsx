import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { plusDay } from "redux/slice/dateSlice";

function DateHeader({ onTitleClick = () => {} }) {
  const dispatch = useDispatch();
  const { year, month } = useSelector((state) => state.date.selectedDate);

  const renderMonth = useMemo(() => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }, [month]);

  const handleClickPrev = useCallback(() => {
    dispatch(plusDay(-1));
  }, [dispatch]);

  const handleClickNext = useCallback(() => {
    dispatch(plusDay(1));
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
      >{`${renderMonth} ${year}`}</div>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleRight}
        onClick={handleClickNext}
      />
    </>
  );
}

export default DateHeader;
