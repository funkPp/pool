import { Route, Routes } from "react-router-dom";
import { Schedule } from "./Schedule";

export function ScheduleLayout() {
  return (
    <div className="px-4">
      <div className="container">
        <Routes>
          <Route index element={<Schedule />} />
          {/* <Route path="add" element={<AddEdit />} />
          <Route path="edit/:id" element={<AddEdit />} /> */}
        </Routes>
      </div>
    </div>
  );
}
