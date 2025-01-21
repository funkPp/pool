import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
require("globalize/lib/cultures/globalize.culture.ru-RU");

const mlocalizer = momentLocalizer(moment);
const myEventsList = [
  {
    id: 10,
    title: "Тестовое событие",
    start: new Date(2025, 0, 21, 9, 0, 0),
    end: new Date(2025, 0, 21, 10, 30, 0),
    resourceId: [1],
  },
];

const cultures = "ru-RU";
const messages = {
  week: "Неделя",
  work_week: "Рабочая неделя",
  day: "День",
  month: "Месяц",
  previous: "Назад",
  next: "Вперед",
  today: "Сегодня",
  agenda: "План",
  date: "Дата",
  time: "Время",
  event: "Группа",
};

export function Schedule({ localizer }: { localizer: DateLocalizer }) {
  return (
    <div>
      <h1 className="p-1 font-semibold text-cyan-600 text-center">
        Расписание
      </h1>
      <div className="flex flex-row columns-2">
        <div className="w-3/4 ">
          <Calendar
            culture={cultures}
            messages={messages}
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
        <div className="w-1/4 border"></div>
      </div>
    </div>
  );
}
