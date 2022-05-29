import CalendarHeader from "component/calendarHeader";
import CalendarBody from "component/calendarBody";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setupDate } from "redux/slice/dateSlice";
function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setupDate(new Date()));
  }, [dispatch]);

  return (
    <div className="p-2 md:border md:border-[#cdcdcd] md:w-96 w-full md:m-2">
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}

export default Home;
