interface Props {
  selectedPlatform: number | null;
  onSelectPlatform: (platformId: number | null) => void;
}

const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: Props) => {
  const platforms = [
  { id: 4, name: "PC" },
  { id: 18, name: "PlayStation 4" },
  { id: 187, name: "PlayStation 5" },     // ← Added PS5
  { id: 1, name: "Xbox One" },
  { id: 186, name: "Xbox Series X/S" },
  { id: 7, name: "Nintendo Switch" },
  { id: 3, name: "iOS" },
  { id: 21, name: "Android" },
];

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-500 dark:text-gray-400 text-sm">Platform:</span>
      <select
        value={selectedPlatform || ''}
        onChange={(e) => onSelectPlatform(e.target.value ? Number(e.target.value) : null)}
        className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
      >
        <option value="">All Platforms</option>
        {platforms.map(platform => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlatformSelector;