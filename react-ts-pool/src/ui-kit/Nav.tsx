import { NavLink } from "react-router-dom";
import { authActions, useAppSelector, useAppDispatch } from "../store";

export function Nav() {
  const auth = useAppSelector((x) => x.auth.value);
  const dispatch = useAppDispatch();
  const logout = () => dispatch(authActions.logout());

  if (!auth) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <div className="navbar-nav">
        <NavLink to="/" className="nav-item nav-link">
          Главная страница
        </NavLink>
        {auth.role === "admin" || auth.role === "owner" ? (
          <NavLink to="/admin" className="nav-item nav-link">
            Админка
          </NavLink>
        ) : null}
        <button onClick={logout} className="btn btn-link nav-item nav-link">
          Выход
        </button>
      </div>
    </nav>
  );
}
