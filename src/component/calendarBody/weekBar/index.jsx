import WeekItem from "component/calendarBody/weekBar/weekItem";

function WeekBar() {
  return (
    <div className="flex justify-between">
      <WeekItem>Su</WeekItem>
      <WeekItem>Mo</WeekItem>
      <WeekItem>Tu</WeekItem>
      <WeekItem>We</WeekItem>
      <WeekItem>Th</WeekItem>
      <WeekItem>Fr</WeekItem>
      <WeekItem>Sa</WeekItem>
    </div>
  );
}

export default WeekBar;
