"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import type { Project } from "@/src/data/projects";

type ProjectCardProps = { project: Project; index: number };

// Only ProjectCard instances register here; the hero is never included.
const portfolioVideos = new Set<HTMLVideoElement>();

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const prepareVideo = useCallback(() => {
    const video = videoRef.current;
    if (video && video.getAttribute("src") !== project.video) {
      video.src = project.video;
    }
  }, [project.video]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    portfolioVideos.add(video);

    // Without IntersectionObserver, an explicit play still loads the video.
    if (typeof IntersectionObserver === "undefined") {
      return () => {
        video.pause();
        portfolioVideos.delete(video);
      };
    }

    const loadObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        prepareVideo();
        loadObserver.disconnect();
      }
    }, { rootMargin: "300px 0px" });

    const visibilityObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => !entry.isIntersecting || entry.intersectionRatio < 0.1)) {
        video.pause();
      }
    }, { threshold: [0, 0.1] });

    loadObserver.observe(video);
    visibilityObserver.observe(video);

    return () => {
      loadObserver.disconnect();
      visibilityObserver.disconnect();
      video.pause();
      portfolioVideos.delete(video);
    };
  }, [prepareVideo]);

  function pauseOtherCards() {
    for (const video of portfolioVideos) {
      if (video !== videoRef.current) video.pause();
    }
  }

  function playVideo() {
    prepareVideo();
    pauseOtherCards();
    void videoRef.current?.play().catch(() => undefined);
  }

  function handlePlay() {
    pauseOtherCards();
    setIsPlaying(true);
  }

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (detailsRef.current) detailsRef.current.open = true;
      playVideo();
    } else {
      video.pause();
    }
  }

  function toggleAudio() {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  }

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    if (event.currentTarget.open) {
      playVideo();
    } else {
      videoRef.current?.pause();
    }
  }

  function handleWatchClick(event: React.MouseEvent<HTMLButtonElement>) {
    const details = event.currentTarget.closest("details");

    event.preventDefault();
    event.stopPropagation();

    if (!details) return;

    const shouldOpen = !details.open;
    details.open = shouldOpen;

    if (shouldOpen) {
      playVideo();
    } else {
      videoRef.current?.pause();
    }
  }

  return (
    <article className={`project-card ${index % 2 ? "project-card-offset" : ""}`}>
      <div className="project-player">
      <details ref={detailsRef} onToggle={handleToggle}>
        <summary>
          <div className={`project-visual ${project.tone}`}>
            {project.video ? (
              <video
                className="project-video"
                ref={videoRef}
                poster={project.thumbnail}
                loop
                playsInline
                preload="metadata"
                onPlay={handlePlay}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
                aria-label={`Vídeo do projeto ${project.title}`}
              />
            ) : (
              <span className="visual-placeholder">{project.title}</span>
            )}
            <span className="visual-number">0{index + 1}</span>
            <span className="visual-arrow" aria-hidden="true">↗</span>
            <button
              type="button"
              className="visual-cta"
              aria-label={`Assistir ao vídeo de ${project.title}`}
              onClick={handleWatchClick}
            >
              Assistir
            </button>
          </div>
        </summary>
      </details>
      {project.video && (
        <div className="project-video-controls" role="group" aria-label={`Controles do vídeo de ${project.title}`}>
          <button
            type="button"
            className="project-video-control"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
            title={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              {isPlaying ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="m8 4 12 8-12 8z" />}
            </svg>
          </button>
          <button
            type="button"
            className="project-video-control"
            onClick={toggleAudio}
            aria-label={isMuted ? "Ativar som" : "Silenciar vídeo"}
            title={isMuted ? "Ativar som" : "Silenciar vídeo"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H3v6h3l5 4z" />
              {isMuted ? <path d="m16 9 6 6m0-6-6 6" /> : <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />}
            </svg>
          </button>
        </div>
      )}
      </div>
    </article>
  );
}
