import { Route, Routes } from "react-router-dom";
import { StudentsByGroupList } from "./StudentsByGroupList ";

export function StudentsByGroupLayout() {
  return (
    <div className="px-4">
      <div className="container">
        <Routes>
          <Route index element={<StudentsByGroupList id="" />} />
        </Routes>
      </div>
    </div>
  );
}
