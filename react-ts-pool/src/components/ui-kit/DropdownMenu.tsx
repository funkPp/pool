import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function DropdownMenu({
  buttonLabel,
  items,
}: {
  buttonLabel: string;
  items: {
    title: string;
    url?: string;
    icon?: JSX.Element;
    action?: () => void;
  }[];
}) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-center rounded-md text-sm p-2 m-2"
        onClick={handleToggle}
      >
        {buttonLabel}
        <span className="ml-2">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-10">
          <ul className="w-40 h-auto shadow-md rounded-md p-1 border bg-white">
            {items.map((item, index) => (
              <li
                key={index}
                className={`relative flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md`}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.url ? (
                  <Link
                    to={item.url}
                    className="w-full text-left"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      item.action?.();
                      setOpen(false);
                    }}
                    type="button"
                  >
                    {item.title}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
