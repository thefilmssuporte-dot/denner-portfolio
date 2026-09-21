"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import type { Project } from "@/src/data/projects";

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (detailsRef.current) detailsRef.current.open = true;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }

  function toggleAudio() {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  }

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open || !videoRef.current) return;

    void videoRef.current.play().catch(() => undefined);
  }

  function handleWatchClick(event: React.MouseEvent<HTMLButtonElement>) {
    const details = event.currentTarget.closest("details");

    event.preventDefault();
    event.stopPropagation();

    if (!details) return;

    const shouldOpen = !details.open;
    details.open = shouldOpen;

    if (!shouldOpen || !videoRef.current) return;

    void videoRef.current.play().catch(() => undefined);
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
                src={project.video}
                poster={project.thumbnail}
                loop
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
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
