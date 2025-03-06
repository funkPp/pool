import { Route, Routes } from "react-router-dom";
import { Schedule } from "./Schedule";

export function ScheduleLayout() {
  return (
    <div className="px-4">
      <div className="container">
        <Routes>
          <Route index element={<Schedule />} />
        </Routes>
      </div>
    </div>
  );
}
