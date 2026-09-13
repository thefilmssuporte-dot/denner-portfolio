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
          </div>
        </summary>
      </details>
    </article>
  );
}