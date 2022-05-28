import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

function CalendarHeader() {
  return (
    <div className="flex">
      <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
      <div>May 2018</div>
      <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
    </div>
  );
}

export default CalendarHeader;
