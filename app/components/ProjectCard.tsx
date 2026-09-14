"use client";

import { useRef, type SyntheticEvent } from "react";
import type { Project } from "@/src/data/projects";

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open || !videoRef.current) return;

    videoRef.current.muted = true;
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

    videoRef.current.muted = true;
    void videoRef.current.play().catch(() => undefined);
  }

  return (
    <article className={`project-card ${index % 2 ? "project-card-offset" : ""}`}>
      <details onToggle={handleToggle}>
        <summary>
          <div className={`project-visual ${project.tone}`}>
            {project.video ? (
              <video
                className="project-video"
                ref={videoRef}
                src={project.video}
                poster={project.thumbnail}
                muted
                loop
                playsInline
                preload="metadata"
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
    </article>
  );
}