import { useMemo } from "react";
import ItemContainer from "component/calendarBody/itemContainer/itemContainer";

const Type = {
  TodayWithoutSelected: "todayWithoutSelected",
  Selected: "selected",
  Disabled: "disabled",
  Normal: "normal",
};

function DayItem({ children, type }) {
  const renderTypeCss = useMemo(() => {
    switch (type) {
      case Type.TodayWithoutSelected:
        return "text-[#db3d44]";
      case Type.Selected:
        return "rounded-full bg-[#db3d44] text-[#ffffff]";
      case Type.Disabled:
        return "text-[#eeeeee]";
      case Type.Normal:
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
