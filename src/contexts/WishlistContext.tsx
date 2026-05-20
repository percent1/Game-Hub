import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Game } from '../types/index';

interface WishlistContextType {
  wishlist: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: number) => void;
  isInWishlist: (gameId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Game[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (game: Game) => {
    if (!wishlist.some(g => g.id === game.id)) {
      setWishlist(prev => [...prev, game]);
    }
  };

  const removeFromWishlist = (gameId: number) => {
    setWishlist(prev => prev.filter(g => g.id !== gameId));
  };

  const isInWishlist = (gameId: number) => 
    wishlist.some(g => g.id === gameId);

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};