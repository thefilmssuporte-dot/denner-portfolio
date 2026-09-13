"use client";

export default function HeroVideo() {
  return (
    <video
      className="hero-video"
      src="https://res.cloudinary.com/wtjfrix6/video/upload/TBT_RODEIO_2024.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}