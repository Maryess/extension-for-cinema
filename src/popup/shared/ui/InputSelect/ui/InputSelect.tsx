type Option = {
  value: string;
  title: string;
};

interface ISelectInput {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
}

export const InputSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: ISelectInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="w-full">
      <select
        value={value}
        onChange={handleChange}
        className="w-full h-10 px-4 text-sm rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};
