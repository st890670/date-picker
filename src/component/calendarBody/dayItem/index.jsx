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
        return "rounded-full bg-[#db3d44] text-[#ffffff]";
      case Type.Disabled:
        return "text-[#eeeeee]";
      default:
        return "";
    }
  }, [type]);

  return (
    <ItemContainer className={renderTypeCss} clickable={true}>
      {children}
    </ItemContainer>
  );
}
export { Type };
export default DayItem;
