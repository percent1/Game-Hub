import axios from 'axios';
import type { Game } from '../types/index';

const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY,
  },
});

interface GetGamesParams {
  page_size?: number;
  search?: string;
  genres?: number;
  platforms?: number;
  ordering?: string;
}

export const gameService = {
  // Fetch Games (returns results + next page)
  getGames: async (params: GetGamesParams = {}) => {
    const response = await apiClient.get('/games', { 
      params: {
        ...params,
        ordering: params.ordering || '-rating',
      }
    });
    
    return {
      results: response.data.results as Game[],
      next: response.data.next as string | null,
    };
  },

  // Fetch Genres - Fixed
  getGenres: async () => {
    const response = await apiClient.get('/genres');
    return response.data.results as any[];   // or define a proper Genre type
  },
};

export default apiClient;