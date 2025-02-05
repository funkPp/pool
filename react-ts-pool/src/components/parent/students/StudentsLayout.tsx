import { Routes, Route } from "react-router-dom";

import { StudentsList } from "./StudentsList";
import { AddEditStudent } from "./AddEditStudent";

export function StudentsLayout() {
  return (
    <div className="px-4">
      <div className="container">
        <Routes>
          <Route index element={<StudentsList />} />
          {/* <Route path="add" element={<AddEditStudent />} /> */}
          <Route path="edit/:id" element={<AddEditStudent />} />
        </Routes>
      </div>
    </div>
  );
}
