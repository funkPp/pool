import {
  Calendar,
  momentLocalizer,
  Views,
  stringOrDate,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ru";
import { useCallback, useMemo, useRef, useState } from "react";
import { messages, resources, ADD_PERIOD } from "./configCalendar";
import { GroupList } from "../groups/GroupList";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { IEvent, IResources } from "../../../shared";
import {
  useEventMurationDelete,
  useEventMutationEdit,
  useEventMutationСreate,
  useGetEvents,
} from "./api";
import { useGetGroups } from "../groups/api";

const DnDCalendar = withDragAndDrop<IEvent, IResources>(Calendar);
const mLocalizer = momentLocalizer(moment);

export function Schedule() {
  const minTime = useMemo(() => new Date(1972, 0, 0, 8, 0, 0, 0), []);
  const maxTime = useMemo(() => new Date(1972, 0, 0, 22, 0, 0, 0), []);
  const defaultDate = useMemo(() => new Date(), []);

  // const [myEvents, setMyEvents] = useState<IEvent[]>(events);
  const [draggedEvent, setDraggedEvent] = useState<React.DragEvent | null>(
    null,
  );
  const refId = useRef<string>("");

  const { data: events, error, isLoading } = useGetEvents();
  const { data: groups } = useGetGroups();

  const mutationEdit = useEventMutationEdit();
  const mutationCreate = useEventMutationСreate();
  const mutationDelete = useEventMurationDelete();

  if (events) {
    events.forEach((element: IEvent) => {
      if ("resource_id" in element)
        element.resourceId = +(element.resource_id as string);
    });
    //console.log(events);
  }

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

  const selectEvent = useCallback(
    (event: IEvent, e: React.SyntheticEvent<HTMLElement>) => {
      console.log("Forus-", event.id.toString());
      refId.current = event.id.toString();
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
        event.allDay = false;
      }

      refId.current = event.id.toString();

      const eventUpdate = { ...event, start, end, allDay, resourceId };
      console.log("upd:", eventUpdate);
      mutationEdit.mutate(eventUpdate);
    },
    [mutationEdit],
  );

  const newEvent = useCallback(
    (event: Omit<IEvent, "id">) => {
      console.log("new", event);
      mutationCreate.mutate(event);
    },
    [mutationCreate],
  );

  const onDropFromOutside = useCallback(
    ({
      start,
      end,
      allDay: isAllDay,
      resource,
    }: {
      start: stringOrDate;
      end: stringOrDate;
      allDay?: boolean;
      resource?: string | number;
    }) => {
      const target = draggedEvent?.target;

      if (!(target instanceof HTMLLIElement)) return;

      if (end instanceof Date && start instanceof Date) {
        end.setMinutes(end.getMinutes() + ADD_PERIOD);
      }

      const id = target.dataset.groupId;

      let nameGroup = "!";
      if (Array.isArray(groups) && id) {
        nameGroup = groups.find((g) => +g.id === +id).name;
      }
      const event = {
        title: "Занятие: " + nameGroup,
        start,
        end,
        isAllDay,
        group_id: id,
        resourceId: resource,
        resource_id: resource,
      };
      setDraggedEvent(null);

      console.log(event);
      newEvent(event);
    },
    [draggedEvent, newEvent],
  );

  const keyPressEvent = (
    event: IEvent,
    e: React.SyntheticEvent<HTMLElement>,
  ) => {
    console.log({ e });
    if ("key" in e) {
      if (e.key === "Delete") {
        mutationDelete.mutate(event.id.toString());
      }
    }
  };
  return (
    <div>
      <h1 className="p-1 font-semibold text-cyan-600 text-center">
        Расписание
      </h1>
      <div className="flex flex-row columns-2">
        <div className="w-3/4 ">
          <DnDCalendar
            onKeyPressEvent={keyPressEvent}
            messages={messages}
            startAccessor={(event) => {
              return new Date(event.start);
            }}
            endAccessor={(event) => {
              return new Date(event.end);
            }}
            min={minTime}
            max={maxTime}
            style={{ height: 500 }}
            resources={resources}
            resourceGroupingLayout={true}
            defaultDate={defaultDate}
            defaultView={Views.DAY}
            dragFromOutsideItem={() => "id"}
            draggableAccessor={() => true}
            resizableAccessor={() => true}
            events={events}
            localizer={mLocalizer}
            onDropFromOutside={onDropFromOutside}
            onDragOver={customOnDragOverFromOutside}
            // onDragStart={dragStart}
            onEventDrop={moveEvent}
            onSelectEvent={selectEvent}
            resizable
            selectable
            step={30}
          />
        </div>
        <div className="w-1/4 border items-center mx-1">
          <GroupList handleDragStart={handleDragStart} />
        </div>
      </div>
    </div>
  );
}
