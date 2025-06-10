import { VideoData } from '@/hooks/useCocktailVideoData';

interface VideoPlayerProps {
  videoData: VideoData | null;
  isLoading: boolean;
  error?: string;
}

export function VideoPlayer({ videoData, isLoading, error }: VideoPlayerProps) {
  if (isLoading) {
    return (
      <div className='aspect-video w-full bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center'>
        <div className='text-gray-400'>Loading video...</div>
      </div>
    );
  }

  if (error || !videoData) {
    return (
      <div className='aspect-video w-full bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center'>
        <div className='text-gray-400'>{error || 'No video available for this cocktail'}</div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='aspect-video w-full bg-gray-800 rounded-lg overflow-hidden'>
        <iframe
          src={`https://www.youtube.com/embed/${videoData.videoId}`}
          title={videoData.title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='w-full h-full'
        />
      </div>
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold text-white'>{videoData.title}</h3>
        <p className='text-sm text-gray-400'>by {videoData.channelTitle}</p>
      </div>
    </div>
  );
}
