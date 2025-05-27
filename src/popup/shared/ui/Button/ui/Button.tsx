interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
}

export const Button = ({
  children,
  onClick,
  active,
  className,
  type,
}: IButton) => {
  return (
    <div
      className={`
      px-4 py-2 rounded-lg text-sm font-medium
      border-2 transition-all duration-200
      ${
        active
          ? "bg-accent-blue-300 text-light-300 border-accent-blue-400"
          : "bg-light-300 text-dark-500 border-accent-blue-300"
      }
      hover:bg-accent-blue-300 hover:text-light-300 hover:border-accent-blue-400
      ${className || ""}
    `}
    >
      <button type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
