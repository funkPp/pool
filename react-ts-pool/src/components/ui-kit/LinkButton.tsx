import clsx from "clsx";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function LinkButton({
  typeClass,
  to,
  children,
  disabled,
}: {
  typeClass: string;
  to: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  const selectClass: { [index: string]: string } = {
    main: `py-2 px-2 focus:outline-none bg-gray-50 rounded-lg 
                        border border-gray-300 hover:bg-gray-100 hover:text-cyan-700
                        focus:z-10 focus:ring-3 focus:ring-cyan-100 content-center`,
    flexRight: `py-2 px-2 focus:outline-none bg-gray-50 rounded-lg 
                        border border-gray-300 hover:bg-gray-100 hover:text-cyan-700
                        focus:z-10 focus:ring-3 focus:ring-cyan-100 content-center self-end`,
  };
  const disabledStyle = disabled ? "cursor-wait" : "";
  return (
    <Link
      to={to}
      className={clsx(selectClass[typeClass], disabledStyle)}
      role="button"
    >
      {children}
    </Link>
  );
}

export default LinkButton;
