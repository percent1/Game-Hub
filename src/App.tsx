import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import GenreList from './components/layout/GenreList';
import GameCard from './components/game/GameCard';
import SortSelector from './components/layout/SortSelector';
import PlatformSelector from './components/layout/PlatformSelector';
import GameModal from './components/game/GameModal';
import { gameService } from './services/api';
import type { Game, Genre } from './types/index';

function App() {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState('-rating');
  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchText), 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  // Reset when filters change
  useEffect(() => {
    setGames([]);
    setNextPage(null);
  }, [debouncedSearch, selectedGenre, selectedPlatform, sortOrder]);

  // Fetch Genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await gameService.getGenres();
        setGenres(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch Games
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const params: any = { page_size: 15, ordering: sortOrder };

        if (debouncedSearch) params.search = debouncedSearch;
        if (selectedGenre) params.genres = selectedGenre.id;
        if (selectedPlatform) params.platforms = selectedPlatform;

        const response = await gameService.getGames(params);
        setGames(response.results);
        setNextPage(response.next);
      } catch (error) {
        console.error("Failed to load games", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [debouncedSearch, selectedGenre, selectedPlatform, sortOrder]);

  const loadMoreGames = async () => {
    if (!nextPage || loadingMore) return;

    setLoadingMore(true);
    try {
      const res = await fetch(nextPage);
      const data = await res.json();
      setGames(prev => [...prev, ...data.results]);
      setNextPage(data.next);
    } catch (error) {
      console.error("Failed to load more games", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleTheme = () => { /* keep your existing toggleTheme */ };
  const openModal = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onSearch={setSearchText} onThemeToggle={toggleTheme} isDark={isDark} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-60 flex-shrink-0">
            <GenreList genres={genres} selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
          </aside>

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
              <h2 className="text-3xl font-bold dark:text-white">
                {selectedGenre ? selectedGenre.name : "All Games"}
              </h2>

              <div className="flex gap-3">
                <PlatformSelector selectedPlatform={selectedPlatform} onSelectPlatform={setSelectedPlatform} />
                <SortSelector sortOrder={sortOrder} onSortChange={setSortOrder} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map(game => (
                <GameCard key={game.id} game={game} onClick={openModal} />
              ))}
            </div>

            {/* Load More Button */}
            {nextPage && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMoreGames}
                  disabled={loadingMore}
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-2xl font-medium transition"
                >
                  {loadingMore ? "Loading more..." : "Load More Games"}
                </button>
              </div>
            )}

            {loading && games.length === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <GameModal game={selectedGame} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;