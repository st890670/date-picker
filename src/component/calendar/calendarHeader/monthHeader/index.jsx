import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { prevYear, nextYear } from "redux/slice/dateSlice";

function MonthHeader({ onTitleClick = () => {} }) {
  const dispatch = useDispatch();
  const relatedMonth = useSelector((state) => state.date.relatedMonth);

  const handleClickPrev = useCallback(() => {
    dispatch(prevYear());
  }, [dispatch]);

  const handleClickNext = useCallback(() => {
    dispatch(nextYear());
  }, [dispatch]);

  return (
    <>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleLeft}
        onClick={handleClickPrev}
      />
      <div className="cursor-pointer" onClick={onTitleClick}>
        {relatedMonth[0].year}
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
