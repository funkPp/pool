import { ReactNode } from "react";

export function Card({
  typeClass,
  children,
}: {
  typeClass: string;
  children: ReactNode;
}) {
  const selectClass: { [index: string]: string } = {
    main: `max-w-sm mx-auto  bg-white text-cyan-700 p-6 
    border border-gray-200 rounded-lg shadow`,
  };

  return <div className={selectClass[typeClass]}>{children}</div>;
}
