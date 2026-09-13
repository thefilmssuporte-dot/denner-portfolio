"use client";

import type { Project } from "@/src/data/projects";

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className={`project-card ${index % 2 ? "project-card-offset" : ""}`}>
      <details>
        <summary>
          <div className={`project-visual ${project.tone}`}>
            {project.video ? (
              <video
                className="project-video"
                src={project.video}
                muted
                autoPlay
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
        <div className="project-detail">
          <p>{project.description}</p>
          <div>
            <span>Cliente</span>
            <strong>{project.client}</strong>
          </div>
          <div>
            <span>Funções realizadas</span>
            <strong>{project.roles.join(" • ")}</strong>
          </div>
        </div>
      </details>
    </article>
  );
}