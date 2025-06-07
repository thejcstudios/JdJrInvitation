import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  facebookVideoUrl?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  src?: string; // local video file path or URL
}

const VideoFile: React.FC<VideoPlayerProps> = ({
  src,
  facebookVideoUrl = 'https://www.facebook.com/thejcstudios/videos/1214634553636396',
  title = 'Video Player',
  autoPlay = false,
  loop = false,
  muted = false,
}) => {
  const fbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fbWindow = window as any;

    if (!fbWindow.FB) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      document.body.appendChild(script);
    } else {
      fbWindow.FB.XFBML.parse();
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '4rem 0' }}>
      <h2 style={{ fontFamily: 'Dancing Script, cursive', fontSize: '2rem' }}>
        Sneak Peek
      </h2>
      {src ? (
        <video
          src={src}
          title={title}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls
          style={{ maxWidth: '100%', borderRadius: '12px' }}
        />
      ) : (
        <div
          className="fb-video"
          data-href={facebookVideoUrl}
          data-width="900"
          data-show-text="false"
          ref={fbRef}
        ></div>
      )}
    </div>
  );
};

export default VideoFile;
