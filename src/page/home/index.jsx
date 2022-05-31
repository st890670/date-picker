import Calendar from "component/calendar";

function Home() {
  return (
    <Calendar
      defaultDate={new Date()}
      onSelectDate={(date) => console.log(date)}
    />
  );
}

export default Home;
