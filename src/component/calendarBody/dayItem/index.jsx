import { useMemo } from "react";
import ItemContainer from "component/calendarBody/itemContainer/itemContainer";

const Type = {
  Selected: "selected",
  Disabled: "disabled",
};

function DayItem({ children, type }) {
  const renderTypeCss = useMemo(() => {
    switch (type) {
      case Type.Selected:
        return "rounded-full bg-[#ff0000] text-[#ffffff]";
      case Type.Disabled:
        return "text-[#cdcdcd]";
      default:
        return "";
    }
  }, [type]);

  return (
    <ItemContainer className={renderTypeCss} clickable={false}>
      {children}
    </ItemContainer>
  );
}
export { Type };
export default DayItem;
