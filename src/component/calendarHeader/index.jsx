import { useMemo } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

function CalendarHeader() {
  const { year, month } = useSelector((state) => state.date.currentDate);

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

  return (
    <div className="w-full flex justify-between items-center px-1 py-3">
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleLeft}
      ></FontAwesomeIcon>
      <div className="cursor-pointer">{`${renderMonth} ${year}`}</div>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleRight}
      ></FontAwesomeIcon>
    </div>
  );
}

export default CalendarHeader;
