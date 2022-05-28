import ItemContainer from "component/calendarBody/itemContainer/itemContainer";

function WeekItem({ children }) {
  return <ItemContainer clickable={false}>{children}</ItemContainer>;
}

export default WeekItem;
