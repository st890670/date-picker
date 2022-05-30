import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

function YearHeader() {
  const { year } = useSelector((state) => state.date.selectedDate);

  const handleClickPrev = useCallback(() => {}, []);

  const handleClickNext = useCallback(() => {}, []);

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
