import { Routes, Route, Navigate } from "react-router-dom";
import { authActions, useAppDispatch } from  "../../shared/store";
import { Login, Register } from ".";

export function AccountLayout() {
  // const auth = useSelector(x => x.auth.value);

  // if (auth) {
  //     return <Navigate to="/" />;
  // }

  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}
