import { ReactNode } from "react";

export function Button({
  typeClass,
  children,
}: {
  typeClass: string;
  children: ReactNode;
}) {
  const selectClass: { [index: string]: string } = {
    main: `py-2 px-5 mb-1 focus:outline-none bg-gray-50 rounded-lg 
    border border-gray-300 hover:bg-gray-100 hover:text-cyan-700
    focus:z-10 focus:ring-3 focus:ring-cyan-100`,
  };

  return <div className={selectClass[typeClass]}>{children}</div>;
}
