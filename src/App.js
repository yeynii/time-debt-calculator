import './App.css';
import Calendar from './component/Calendar';

function App() {
  return (
    <div className="App">
      <Calendar>
        <Calendar.Header></Calendar.Header>

        <Calendar.WeekDays></Calendar.WeekDays>
        <Calendar.Body></Calendar.Body>
      </Calendar>
    </div>
  );
}
export default App;
