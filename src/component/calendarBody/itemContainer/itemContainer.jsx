import { useMemo } from "react";

function ItemContainer({
  className = "",
  children,
  clickable = true,
  onClick = () => {},
}) {
  const renderClickableCss = useMemo(() => {
    if (!clickable) {
      return "";
    }
    return "cursor-pointer";
  }, [clickable]);

  return (
    <div
      className={`w-10 h-10 flex justify-center items-center ${renderClickableCss} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default ItemContainer;
