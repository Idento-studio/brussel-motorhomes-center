"use client";

import { useRef, useState } from "react";
import { metPad } from "@/lib/basePath";

export function VideoMetGeluidsknop({ src, poster, ariaLabel }: { src: string; poster: string; ariaLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [gedempt, setGedempt] = useState(true);

  return (
    <div className="media media-video media-4x3 media-rond">
      <video ref={videoRef} muted={gedempt} autoPlay loop playsInline preload="auto" poster={metPad(poster)} aria-label={ariaLabel}>
        <source src={metPad(src)} type="video/mp4" />
      </video>
      <button
        type="button"
        className="video-geluidsknop"
        aria-pressed={!gedempt}
        onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          video.muted = !video.muted;
          setGedempt(video.muted);
        }}
      >
        <svg className="icoon-mute" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" /></svg>
        <svg className="icoon-geluid" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
        {gedempt ? "Geluid aan" : "Geluid uit"}
      </button>
    </div>
  );
}
