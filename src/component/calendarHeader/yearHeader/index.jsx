import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { plusDay } from "redux/slice/dateSlice";

function YearHeader({}) {
  const dispatch = useDispatch();
  const { year } = useSelector((state) => state.date.selectedDate);

  const handleClickPrev = useCallback(() => {}, [dispatch]);

  const handleClickNext = useCallback(() => {}, [dispatch]);

  const renderYearRange = useMemo(() => {
    const yearArray = `${year}`.split("");
    const yearPrefix = yearArray.slice(0, yearArray.length - 1).join("");
    return `${yearPrefix}1 - ${yearPrefix}9`;
  }, [year]);

  return (
    <>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleLeft}
        onClick={handleClickPrev}
      />
      <div className="cursor-pointer">{renderYearRange}</div>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleRight}
        onClick={handleClickNext}
      />
    </>
  );
}

export default YearHeader;
