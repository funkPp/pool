import { NavLink } from "react-router-dom";

interface INavProps {
  auth: {
    role: "admin" | "owner" | "user";
  };
  logout: () => void;
}

export function Nav({ auth, logout }: INavProps) {
  if (!auth) return <></>;
  return (
    <nav className="bg-white rounded-xl shadow-md flex flex-col text-center sm:flex-row sm:text-left sm:justify-between font-semibold text-cyan-600">
      <div className="p-2 m-2 font-semibold text-cyan-600">
        <NavLink to="/" className="p-2 m-2  hover:text-cyan-800">
          Главная страница
        </NavLink>
        {auth.role === "admin" || auth.role === "owner" ? (
          <NavLink to="/admin" className="p-2 m-2  hover:text-cyan-800">
            Админка
          </NavLink>
        ) : null}
      </div>
      <div className="p-2  ml-auto  hover:text-cyan-800">
        <button onClick={logout} className="p-2 mr-3">
          Выйти
        </button>
      </div>
    </nav>
  );
}
