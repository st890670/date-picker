import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

function CalendarHeader() {
  return (
    <div className="w-full flex justify-between items-center px-1 py-3">
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleLeft}
      ></FontAwesomeIcon>
      <div className="cursor-pointer">May 2018</div>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faAngleRight}
      ></FontAwesomeIcon>
    </div>
  );
}

export default CalendarHeader;
