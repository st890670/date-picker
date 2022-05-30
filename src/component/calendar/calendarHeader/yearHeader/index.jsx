import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { prevRelatedYear, nextRelatedYear } from "redux/slice/dateSlice";

function YearHeader() {
  const dispatch = useDispatch();
  const { relatedYear } = useSelector((state) => state.date);

  const handleClickPrev = useCallback(() => {
    dispatch(prevRelatedYear());
  }, [dispatch]);

  const handleClickNext = useCallback(() => {
    dispatch(nextRelatedYear());
  }, [dispatch]);

  return (
    <>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleLeft}
        onClick={handleClickPrev}
      />
      <div className="cursor-pointer">{`${relatedYear[1]} - ${
        relatedYear[relatedYear.length - 2]
      }`}</div>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleRight}
        onClick={handleClickNext}
      />
    </>
  );
}

export default YearHeader;
