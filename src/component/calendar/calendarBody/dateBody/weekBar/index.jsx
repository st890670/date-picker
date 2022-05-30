import ItemContainer from "component/calendar/calendarBody/itemContainer";

function WeekBar() {
  return (
    <div className="flex justify-between">
      <ItemContainer clickable={false}>Su</ItemContainer>
      <ItemContainer clickable={false}>Mo</ItemContainer>
      <ItemContainer clickable={false}>Tu</ItemContainer>
      <ItemContainer clickable={false}>We</ItemContainer>
      <ItemContainer clickable={false}>Th</ItemContainer>
      <ItemContainer clickable={false}>Fr</ItemContainer>
      <ItemContainer clickable={false}>Sa</ItemContainer>
    </div>
  );
}

export default WeekBar;
