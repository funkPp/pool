import { Route, Routes } from "react-router-dom";
import { Schedule } from "./Schedule";

import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
const mlocalizer = momentLocalizer(moment);

export function ScheduleLayout() {
  return (
    <div className="px-4">
      <div className="container">
        <Routes>
          <Route index element={<Schedule localizer={mlocalizer} />} />
          {/* <Route path="add" element={<AddEdit />} />
          <Route path="edit/:id" element={<AddEdit />} /> */}
        </Routes>
      </div>
    </div>
  );
}
