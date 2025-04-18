import { useEffect, useRef, useState } from "react";
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

  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  return (
    <div className="relative self-center " ref={menuRef}>
      <button
        type="button"
        className="flex items-center justify-center rounded-md text-sm p-1 sm:m-2 "
        onClick={handleToggle}
      >
        {buttonLabel}
        <span className="ml-2">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 sm:top-10 top-7">
          <ul className="w-40 h-auto shadow-md rounded-md p-1 border bg-white">
            {items.map((item, index) => (
              <li
                key={index}
                className={`relative flex items-center gap-1 px-4 py-1 text-sm hover:bg-gray-100 rounded-md`}
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
