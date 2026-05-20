import { X, Star, Calendar } from 'lucide-react';
import type { Game } from '../../types/index';
import { useState } from 'react';

interface Props {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

const GameModal = ({ game, isOpen, onClose }: Props) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  if (!game || !isOpen) return null;

  const screenshots = game.short_screenshots || [];
  const hasScreenshots = screenshots.length > 0;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        
        {/* Hero Image */}
        <div className="relative h-80">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 hover:bg-red-600 text-white p-3 rounded-full transition"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-bold dark:text-white">{game.name}</h2>
            <div className="flex items-center gap-2">
              {game.metacritic && (
                <div className="bg-green-500 text-white px-4 py-2 rounded-2xl font-bold">
                  {game.metacritic}
                </div>
              )}
              <div className="text-3xl font-bold flex items-center gap-1 text-yellow-500">
                <Star size={28} fill="currentColor" /> {game.rating.toFixed(1)}
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6 flex items-center gap-2">
            <Calendar size={18} /> 
            Released: {new Date(game.released).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}
          </p>

          {/* Genres & Platforms */}
          <div className="flex flex-wrap gap-6 mb-8">
            {game.genres && (
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {game.genres.map((g, i) => (
                    <span key={i} className="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full text-sm">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {game.platforms && (
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.slice(0, 6).map((p, i) => (
                    <span key={i} className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm">
                      {p.platform.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Screenshots Carousel */}
          {hasScreenshots && (
            <div className="mb-8">
              <h3 className="font-semibold mb-4 dark:text-white">Screenshots</h3>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={screenshots[currentScreenshot].image}
                  alt="screenshot"
                  className="w-full h-80 object-cover"
                />
                
                {screenshots.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshot(index)}
                        className={`w-3 h-3 rounded-full transition ${index === currentScreenshot ? 'bg-white scale-125' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {game.description_raw && (
            <div>
              <h3 className="font-semibold mb-3 dark:text-white">About this game</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {game.description_raw}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameModal;