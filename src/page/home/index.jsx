import CalendarHeader from "component/calendarHeader";
import CalendarBody from "component/calendarBody";

function Home() {
  return (
    <div className="p-2 md:border md:border-[#cdcdcd] md:w-96 w-full md:m-2">
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}

export default Home;
