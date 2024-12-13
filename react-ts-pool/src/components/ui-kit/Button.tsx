import clsx from "clsx";

export function Button({
  typeClass,
  disabled,
  value,
}: {
  typeClass: string;
  disabled: boolean;
  value: string;
}) {
  const selectClass: { [index: string]: string } = {
    main: `py-2 px-5 focus:outline-none bg-gray-50 rounded-lg 
    border border-gray-300 hover:bg-gray-100 hover:text-cyan-700
    focus:z-10 focus:ring-3 focus:ring-cyan-100 align-middle`,
  };
  const disabledStyle = disabled ? "cursor-wait" : "";

  return (
    <button className={clsx(selectClass[typeClass], disabledStyle)}>
      {value}
    </button>
  );
}
