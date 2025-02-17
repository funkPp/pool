import {
  Calendar,
  momentLocalizer,
  DateLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ru";
import { useCallback, useMemo, useState } from "react";
import { messages, resources } from "./configCalendar";
import { GroupList } from "../groups/GroupList";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";

const DnDCalendar = withDragAndDrop<IEvent, IResources>(Calendar);
const mLocalizer = momentLocalizer(moment);
const events = [
  {
    id: 10,
    title: "Тестовое событие",
    start: new Date(2025, 1, 17, 9, 0, 0),
    end: new Date(2025, 1, 17, 10, 30, 0),
    // resourceId: 1,
  },
];

type stringOrDate = string | Date;

export interface IEvent {
  id: number;
  title: string;
  start: stringOrDate;
  end: stringOrDate;
  resourceId?: string | number | undefined;
  isDraggable?: boolean;
  allDay?: boolean;
}

interface IResources {
  id: number;
  title: string;
}

export function Schedule() {
  const minTime = useMemo(() => new Date(1972, 0, 0, 8, 0, 0, 0), []);
  const maxTime = useMemo(() => new Date(1972, 0, 0, 22, 0, 0, 0), []);
  const defaultDate = useMemo(() => new Date(), []);

  const [myEvents, setMyEvents] = useState<IEvent[]>(events);
  const [copyEvent, setCopyEvent] = useState(true);
  const [draggedEvent, setDraggedEvent] = useState<React.DragEvent | null>(
    null,
  );

  console.log(myEvents);

  const eventPropGetter = useCallback(
    (event: IEvent) => ({
      ...(event.isDraggable
        ? { className: "isDraggable" }
        : { className: "nonDraggable" }),
    }),
    [],
  );
  // (event: React.DragEvent<T>) => void
  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLLIElement>) => {
      setDraggedEvent(event);
    },
    [],
  );

  const customOnDragOverFromOutside = useCallback(
    (dragEvent: React.DragEvent) => {
      dragEvent.preventDefault();
    },
    [],
  );

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }: {
      event: IEvent;
      start: stringOrDate;
      end: stringOrDate;
      resourceId?: string | number | undefined;
      isAllDay?: boolean;
    }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => {
        const existing =
          prev.find((ev) => ev.id === event.id) ?? ({} as IEvent);
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay, resourceId }];
      });
    },
    [setMyEvents],
  );

  const newEvent = useCallback(
    (event: Omit<IEvent, "id">) => {
      // console.log("new", event);
      setMyEvents((prev) => {
        const idList = prev.map((item) => item.id);
        const newId = Math.max(...idList) + 1;
        console.log("new", [...prev, { ...event, id: newId } as IEvent]);
        return [...prev, { ...event, id: newId } as IEvent];
      });
    },
    [setMyEvents],
  );

  const onDropFromOutside = useCallback(
    ({
      start,
      end,
      allDay: isAllDay,
    }: {
      start: stringOrDate;
      end: stringOrDate;
      allDay?: boolean;
    }) => {
      // if (draggedEvent === "undroppable") {
      //   setDraggedEvent(null);
      //   return;
      // }

      const target = draggedEvent?.target;

      if (!(target instanceof HTMLLIElement)) return;

      const id = target.dataset.groupId;
      const event = {
        title: "Группа №" + id,
        start,
        end,
        isAllDay,
      };
      setDraggedEvent(null);

      console.log(event);
      newEvent(event);
    },
    [draggedEvent, setDraggedEvent, newEvent],
  );

  const resizeEvent = useCallback(
    ({
      event,
      start,
      end,
    }: {
      event: IEvent;
      start: stringOrDate;
      end: stringOrDate;
    }) => {
      setMyEvents((prev) => {
        const existing =
          prev.find((ev) => ev.id === event.id) ?? ({} as IEvent);
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents],
  );
  return (
    <div>
      <h1 className="p-1 font-semibold text-cyan-600 text-center">
        Расписание
      </h1>
      <div className="flex flex-row columns-2">
        <div className="w-3/4 ">
          <DnDCalendar
            // selectable
            messages={messages}
            // localizer={mLocalizer}
            // events={myEvents}
            startAccessor="start"
            endAccessor="end"
            min={minTime}
            max={maxTime}
            style={{ height: 500 }}
            resources={resources}
            resourceGroupingLayout={true}
            defaultDate={defaultDate}
            defaultView={Views.DAY}
            dragFromOutsideItem={() => "id"}
            eventPropGetter={eventPropGetter}
            draggableAccessor={() => true}
            resizableAccessor={() => true}
            events={myEvents}
            localizer={mLocalizer}
            onDropFromOutside={onDropFromOutside}
            onDragOver={customOnDragOverFromOutside}
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            //onSelectSlot={newEvent}
            resizable
            selectable
          />
        </div>
        <div className="w-1/4 border items-center mx-1">
          <GroupList handleDragStart={handleDragStart} />
        </div>
      </div>
    </div>
  );
}
