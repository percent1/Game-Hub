interface Props {
  sortOrder: string;
  onSortChange: (order: string) => void;
}

const SortSelector = ({ sortOrder, onSortChange }: Props) => {
  const sortOptions = [
    { value: '-rating', label: 'Highest Rated' },
    { value: '-metacritic', label: 'Metacritic Score' },
    { value: '-released', label: 'Newest Released' },
    { value: 'released', label: 'Oldest Released' },
    { value: '-added', label: 'Most Popular' },
    { value: 'name', label: 'A-Z' },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-500 dark:text-gray-400 text-sm">Sort by:</span>
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelector;