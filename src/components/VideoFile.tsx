import React from 'react';

interface VideoPlayerProps {
  src: string;              // local video file path or URL (required now)
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  thumbnail?: string;       // optional thumbnail image
}

const VideoFile: React.FC<VideoPlayerProps> = ({
  src,
  title = 'Video Player',
  autoPlay = false,
  loop = false,
  muted = false,
  thumbnail,
}) => {
  return (
    <div style={{ textAlign: 'center', margin: '0rem 0' }}>
      <h2 style={{ fontFamily: 'Dancing Script, cursive', fontSize: '2rem' }}>
        Sneak Peek
      </h2>
      <video
        src={src}
        title={title}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls
        poster={thumbnail}
        style={{ maxWidth: '100%', borderRadius: '12px' }}
      />
    </div>
  );
};

export default VideoFile;
