import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  alertActions,
  useAppSelector,
  useAppDispatch,
  IAlert,
} from "../../store";
import { clsx } from "clsx";

export function Alert() {
  const location = useLocation();
  const alert = useAppSelector((x) => x.alert.value) as IAlert | null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(alertActions.clear());
  }, [location, dispatch]);

  if (!alert) return <></>;

  let colorAlert = "text-red-800 rounded-lg bg-red-50";
  if (alert.type !== "alert") {
    colorAlert = "text-green-800 rounded-lg bg-green-50";
  }

  return (
    <>
      <div
        id="alert-2"
        className={clsx("flex items-center p-4 mb-4", colorAlert)}
        role={alert.type}
      >
        <span className="sr-only">{alert.type}</span>
        <div className="ms-3 text-sm font-medium">{alert.message}</div>
        <button
          onClick={() => dispatch(alertActions.clear())}
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 rounded-md focus:ring-2 focus:ring-grey-400 p-1.5 hover:bg-grey-200 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#alert-2"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
