import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ru";
import { useCallback, useMemo, useState } from "react";
import { messages, resources } from "./configCalendar";
import { GroupList } from "../groups/GroupList";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
const DnDCalendar = withDragAndDrop(Calendar);
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

interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resourceId: number[];
  isDraggable: boolean;
  isAllDay?: boolean;
}

export function Schedule() {
  const minTime = useMemo(() => new Date(1972, 0, 0, 8, 0, 0, 0), []);
  const maxTime = useMemo(() => new Date(1972, 0, 0, 22, 0, 0, 0), []);

  const [draggedEvent, setDraggedEvent] = useState<string | null>();
  const dragFromOutsideItem = useCallback(
    () => (draggedEvent === "undroppable" ? null : draggedEvent),
    [draggedEvent],
  );

  const eventPropGetter = useCallback(
    (event: IEvent) => ({
      ...(event.isDraggable
        ? { className: "isDraggable" }
        : { className: "nonDraggable" }),
    }),
    [],
  );
  // const handleDisplayDragItemInCell = useCallback(
  //   () => setDisplayDragItemInCell((prev) => !prev),
  //   [],
  // );

  // const moveEvent = useCallback(
  //   ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
  //     const { allDay } = event;
  //     if (!allDay && droppedOnAllDaySlot) {
  //       event.allDay = true;
  //     }

  //     setMyEvents((prev) => {
  //       const existing = prev.find((ev) => ev.id === event.id) ?? {};
  //       const filtered = prev.filter((ev) => ev.id !== event.id);
  //       return [...filtered, { ...existing, start, end, allDay }];
  //     });
  //   },
  //   [setMyEvents],
  // );

  // const newEvent = useCallback(
  //   (event) => {
  //     setMyEvents((prev) => {
  //       const idList = prev.map((item) => item.id);
  //       const newId = Math.max(...idList) + 1;
  //       return [...prev, { ...event, id: newId }];
  //     });
  //   },
  //   [setMyEvents],
  // );

  // const onDropFromOutside = useCallback(
  //   ({
  //     start,
  //     end,
  //     isAllDay,
  //   }: {
  //     start: Date;
  //     end: Date;
  //     isAllDay: boolean;
  //   }) => {
  //     if (draggedEvent === "undroppable") {
  //       setDraggedEvent(null);
  //       return;
  //     }

  //     const { name } = draggedEvent;
  //     const event = {
  //       title: name,
  //       start,
  //       end,
  //       isAllDay,
  //     };
  //     setDraggedEvent(null);
  //     newEvent(event);
  //   },
  //   [draggedEvent, counters, setDraggedEvent, newEvent],
  // );

  // const resizeEvent = useCallback(
  //   ({ event, start, end }) => {
  //     setMyEvents((prev) => {
  //       const existing = prev.find((ev) => ev.id === event.id) ?? {};
  //       const filtered = prev.filter((ev) => ev.id !== event.id);
  //       return [...filtered, { ...existing, start, end }];
  //     });
  //   },
  //   [setMyEvents],
  // );

  return (
    <div>
      <h1 className="p-1 font-semibold text-cyan-600 text-center">
        Расписание
      </h1>
      <div className="flex flex-row columns-2">
        <div className="w-3/4 ">
          <DnDCalendar
            selectable
            messages={messages}
            localizer={mLocalizer}
            events={myEventsList}
            // startAccessor="start"
            // endAccessor="end"
            min={minTime}
            max={maxTime}
            style={{ height: 500 }}
            resources={resources}
            resourceGroupingLayout={true}
            // dragFromOutsideItem={dragFromOutsideItem}
            // // draggableAccessor="isDraggable"
            // eventPropGetter={eventPropGetter}
            // onDropFromOutside={onDropFromOutside}
            // onDragOverFromOutside={customOnDragOverFromOutside}
            // onEventDrop={moveEvent}
            // onEventResize={resizeEvent}
            // onSelectSlot={newEvent}
            resizable
          />
        </div>
        <div className="w-1/4 border items-center mx-1">
          <GroupList />
        </div>
      </div>
    </div>
  );
}
