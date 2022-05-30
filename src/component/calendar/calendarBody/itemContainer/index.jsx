import { useMemo } from "react";
const Type = {
  Highlight: "highlight",
  Selected: "selected",
  Disabled: "disabled",
  Normal: "normal",
};

function ItemContainer({
  className = "",
  children,
  type = Type.Normal,
  clickable = true,
  onClick = () => {},
}) {
  const renderTypeCss = useMemo(() => {
    switch (type) {
      case Type.Highlight:
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

  const renderClickableCss = useMemo(() => {
    if (!clickable) {
      return "";
    }
    return "cursor-pointer";
  }, [clickable]);

  return (
    <div
      className={`w-10 h-10 flex justify-center items-center ${renderTypeCss} ${renderClickableCss} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export { Type };
export default ItemContainer;
