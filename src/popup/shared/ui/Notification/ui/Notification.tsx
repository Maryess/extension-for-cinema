import { useEffect } from "react";

type Props = {
  type: "error" | "success";
  message: string;
  onClose: () => void;
  className?: string;
};

export const Notification = ({ type, message, onClose, className }: Props) => {
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, 3000);
      return clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div
      className={`flex items-center p-3.5 rounded-lg shadow-md transition-all duration-300 ${
        type === "success" ? "bg-green-400" : "bg-red-400"
      } ${className}`}
      aria-live="assertive"
    >
      <p className={`flex-1 text-white font-medium p-0.5 rounded`}>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close notification"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
