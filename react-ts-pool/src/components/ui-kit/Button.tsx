import clsx from "clsx";

export function Button({
  typeClass,
  disabled,
  value,
  onClick,
  type,
}: {
  typeClass: string;
  disabled?: boolean;
  value: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  const selectClass: { [index: string]: string } = {
    main: ` px-2 focus:outline-none bg-gray-50 rounded-md
    border border-gray-300 hover:bg-gray-100 hover:text-cyan-700
    focus:z-10 focus:ring-3 focus:ring-cyan-100 align-middle`,

    delete: `py-1 px-2 focus:outline-none bg-red-50 rounded-md 
    border border-red-200 hover:bg-red-100 hover:text-grey-800
    focus:z-10 focus:ring-3 focus:ring-red-300 align-middle`,

    group: `m-1 py-1 px-2 focus:outline-none bg-green-50 rounded-md 
    border border-green-200 hover:bg-green-100 hover:text-grey-800
    focus:z-10 focus:ring-3 focus:ring-green-300 align-middle`,
  };
  const disabledStyle = disabled ? "cursor-wait " : "";
  //  console.log(onClick);
  return (
    <button
      className={clsx(selectClass[typeClass], disabledStyle)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {value}
    </button>
  );
}
