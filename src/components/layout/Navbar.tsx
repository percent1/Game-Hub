import { Search, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import HamburgerMenu from './HamburgerMenu'

interface NavbarProps {
  onSearch: (searchText: string) => void;
  onThemeToggle: () => void;
  isDark: boolean;
}

const Navbar = ({ onSearch, onThemeToggle, isDark }: NavbarProps) => {
  const [searchText, setSearchText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">GameHub</h1>
          </div>

          {/* Search Bar - Hidden on very small screens */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchText}
                onChange={handleSearch}
                className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 pl-11 py-3 rounded-2xl text-sm focus:outline-none transition dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <HamburgerMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
            
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchText}
              onChange={handleSearch}
              className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 pl-11 py-3 rounded-2xl text-sm focus:outline-none transition dark:text-white"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;