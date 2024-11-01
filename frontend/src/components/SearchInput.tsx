interface SearchInputProps {
  handleChange: (value: string) => void;
  value: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  handleChange,
  value,
}) => {
  return (
    <input
      type="text"
      onChange={(evt) => {
        handleChange(evt.target.value);
      }}
      className="w-2/5 min-w-56 h-10 mt-3 mb-1 text-xl text-center border-2 border-slate-300"
      placeholder="Search Titles"
      value={value}
    />
  );
};
