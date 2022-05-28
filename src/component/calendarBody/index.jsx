import DayItem, { Type } from "./dayItem";
import WeekBar from "./weekBar";

function CalendarBody() {
  return (
    <div className="w-full">
      <WeekBar />
      <div className="flex justify-between">
        <DayItem>29</DayItem>
        <DayItem type={Type.Disabled}>30</DayItem>
        <DayItem>1</DayItem>
        <DayItem>2</DayItem>
        <DayItem type={Type.Selected}>3</DayItem>
        <DayItem>4</DayItem>
        <DayItem>5</DayItem>
      </div>
    </div>
  );
}

export default CalendarBody;
