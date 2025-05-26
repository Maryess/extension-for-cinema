type Option = {
  value: string;
  title: string;
};

interface ISelectInput {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}
export const InputSelect = ({ options, value, onChange }: ISelectInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="bg-light-500 w-full h-8 px-4 outline-none border-none text-sm"
    >
      <option value="">Choose language</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};
