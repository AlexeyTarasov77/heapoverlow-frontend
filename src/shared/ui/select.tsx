export function Select({
  labelText,
  options,
  onChange,
  selectedOptionName
}: {
  labelText: string;
  options: { value?: string; name: string }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  selectedOptionName?: string;
}) {
  console.log(selectedOptionName, options);
  
  return (
    <div className="mx-auto max-w-xs">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {labelText}
      </label>
      <select onChange={onChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
        {options.map(obj => (
          <option selected={obj.value === selectedOptionName} value={obj.value}>{obj.name}</option>
        ))}
      </select>
    </div>
  );
}
