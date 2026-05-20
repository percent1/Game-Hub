import type { Genre } from '../../types';

interface Props {
  genres: Genre[];
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre | null) => void;
}

const GenreList = ({ genres, selectedGenre, onSelectGenre }: Props) => {
  return (
    <div className="w-60">
      <h2 className="text-xl font-bold mb-4">Genres</h2>
      
      <div className="space-y-1">
        <button
          onClick={() => onSelectGenre(null)}
          className={`w-full text-left px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition
            ${!selectedGenre ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''}`}
        >
          All Games
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre)}
            className={`w-full text-left px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition
              ${selectedGenre?.id === genre.id ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''}`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreList;