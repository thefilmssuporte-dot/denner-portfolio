"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let disposed = false;
    let playPending = false;

    async function tryPlay() {
      if (!video || disposed || playPending || document.hidden) return;

      // Set the DOM properties before every attempt, including after hydration.
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;

      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.paused) return;

      playPending = true;
      try {
        await video.play();
        delete video.dataset.autoplayError;
      } catch (error) {
        // Autoplay policies can still block playback; keep the poster visible.
        video.dataset.autoplayError = error instanceof Error ? error.name : "PlaybackError";
      } finally {
        playPending = false;
      }
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    window.addEventListener("pageshow", tryPlay);
    void tryPlay();

    return () => {
      disposed = true;
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
      window.removeEventListener("pageshow", tryPlay);
    };
  }, []);

  return (
    <video
      className="hero-video"
      ref={videoRef}
      src="https://res.cloudinary.com/wtjfrix6/video/upload/c_limit,w_1920,f_mp4,vc_h264:main:4.0,q_auto,ac_none/v1789267919/TBT_RODEIO_2024.mp4"
      poster="/images/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
