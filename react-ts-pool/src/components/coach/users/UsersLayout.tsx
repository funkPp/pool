import { Routes, Route } from "react-router-dom";

import { List } from "./UsersList";
import { AddEdit } from "./AddEdit";

export function UsersLayout() {
  return (
    <div className="px-4">
      <div className="container">
        <Routes>
          <Route index element={<List />} />
          <Route path="add" element={<AddEdit />} />
          <Route path="edit/:id" element={<AddEdit />} />
        </Routes>
      </div>
    </div>
  );
}
