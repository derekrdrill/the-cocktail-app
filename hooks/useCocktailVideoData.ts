import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface VideoData {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

const getCocktailVideoOptions = (cocktailId: string) => ({
  method: 'GET',
  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-cocktail-video/${cocktailId}`,
});

export function useCocktailVideoData(cocktailId: string) {
  return useQuery<VideoData>({
    queryKey: ['cocktailVideo', cocktailId],
    queryFn: async () => {
      try {
        const response = await axios.request(getCocktailVideoOptions(cocktailId));
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            videoData: null,
            error: error.response?.data?.message || 'Failed to fetch video data',
          };
        }
        return {
          videoData: null,
          error: 'An unexpected error occurred',
        };
      }
    },
    enabled: !!cocktailId,
  });
}
