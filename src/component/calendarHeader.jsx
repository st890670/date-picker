import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

function CalendarHeader() {
  return (
    <div>
      <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
      <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
    </div>
  );
}

export default CalendarHeader;
