import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ru";
import { useMemo } from "react";
import { messages, resources } from "./configCalendar";

const mLocalizer = momentLocalizer(moment);
const myEventsList = [
  {
    id: 10,
    title: "Тестовое событие",
    start: new Date(2025, 0, 21, 9, 0, 0),
    end: new Date(2025, 0, 21, 10, 30, 0),
    resourceId: [1],
  },
];

export function Schedule() {
  const minTime = useMemo(() => new Date(1972, 0, 0, 8, 0, 0, 0), []);
  const maxTime = useMemo(() => new Date(1972, 0, 0, 22, 0, 0, 0), []);
  return (
    <div>
      <h1 className="p-1 font-semibold text-cyan-600 text-center">
        Расписание
      </h1>
      <div className="flex flex-row columns-2">
        <div className="w-3/4 ">
          <Calendar
            selectable
            messages={messages}
            localizer={mLocalizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            min={minTime}
            max={maxTime}
            style={{ height: 500 }}
            resources={resources}
            resourceGroupingLayout={true}
          />
        </div>
        <div className="w-1/4 border"></div>
      </div>
    </div>
  );
}
