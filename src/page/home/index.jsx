import Calendar from "component/calendar";

function Home() {
  return (
    <Calendar
      defaultDate={new Date()}
      onSelectDate={(date) => console.log("selected date: ", date)}
      onInputChange={(value) => console.log("input value: ", value)}
      inputContainerClass=""
      calendarContainerClass=""
    />
  );
}

export default Home;
