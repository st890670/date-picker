import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { plusYear } from "redux/slice/dateSlice";

function MonthHeader({ onTitleClick = () => {} }) {
  const dispatch = useDispatch();
  const { year } = useSelector((state) => state.date.selectedDate);

  const handleClickPrev = useCallback(() => {
    dispatch(plusYear(-1));
  }, [dispatch]);

  const handleClickNext = useCallback(() => {
    dispatch(plusYear(1));
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
