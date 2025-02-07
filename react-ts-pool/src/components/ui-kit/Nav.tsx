import { NavLink } from "react-router-dom";
import { DropdownMenu } from ".";
import { FaCalendarAlt, FaUserEdit, FaBaby } from "react-icons/fa";

interface INavProps {
  auth: {
    role: "admin" | "owner" | "user";
  };
  logout: () => void;
}

export function Nav({ auth, logout }: INavProps) {
  if (!auth) return <></>;
  // console.log(auth.role);

  return (
    <nav className="bg-white rounded-md shadow-md flex flex-col text-sm text-center sm:flex-row sm:text-left sm:justify-between font-semibold text-cyan-600">
      {auth.role === "user" ? (
        <DropdownMenu
          buttonLabel="Кабинет родителя"
          items={[
            {
              title: "Дети",
              url: "/parent/students/",
              icon: <FaBaby />,
            },
          ]}
        />
      ) : null}
      {auth.role === "admin" || auth.role === "owner" ? (
        <DropdownMenu
          buttonLabel="Кабинет тренера"
          items={[
            {
              title: "Пользователи",
              url: "/admin/users",
              icon: <FaUserEdit />,
            },
            {
              title: "Расписание",
              url: "/admin/schedule",
              icon: <FaCalendarAlt />,
            },
          ]}
        />
      ) : null}
      <NavLink to="/" className="p-2 m-2  hover:text-cyan-800">
        Контакты
      </NavLink>

      <div className="p-2  ml-auto  hover:text-cyan-800">
        <button onClick={logout} className="p-2 mr-3">
          Выйти
        </button>
      </div>
    </nav>
  );
}
