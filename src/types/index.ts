export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: Array<{ name: string }>;
  platforms: Array<{
    platform: { name: string };
  }>;
  description_raw?: string;     // ← Add this
  metacritic?: number;          // ← Add this
  short_screenshots?: Array<{   // ← Add this
    id: number;
    image: string;
  }>;
}

export interface Genre {
  id: number;
  name: string;
  image_background?: string;
}