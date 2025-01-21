import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const myEventsList = [
  {
    id: 0,
    title: "Тестовое событие",
    start: new Date(2025, 0, 21, 9, 0, 0),
    end: new Date(2025, 0, 21, 13, 0, 0),
    resourceId: [1, 2],
  },
];
export function Schedule() {
  return (
    <div>
      <h1 className="p-1 font-semibold text-cyan-600 text-center">
        Расписание
      </h1>
      <div className="flex flex-row columns-2">
        <div className="w-3/4 ">
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
          />
        </div>
        <div className="w-1/4 border"></div>
      </div>
    </div>
  );
}
