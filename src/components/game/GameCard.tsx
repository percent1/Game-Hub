import type { Game } from '../../types/index';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';

interface Props {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard = ({ game, onClick }: Props) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(game.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      removeFromWishlist(game.id);
    } else {
      addToWishlist(game);
    }
  };

  return (
    <div 
      onClick={() => onClick(game)}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group relative"
    >
      <div className="relative">
        <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
        
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <Heart 
            size={20} 
            className={liked ? "fill-red-500 text-red-500" : "text-white"} 
          />
        </button>

        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
          ⭐ {game.rating.toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {game.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {game.released ? new Date(game.released).getFullYear() : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default GameCard;