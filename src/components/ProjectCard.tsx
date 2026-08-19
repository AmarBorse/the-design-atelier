import type { Project } from '../data/projects';

type Props = { project: Project; priority?: boolean };

/**
 * Portrait work tile: image with a slow zoom on hover, caption underneath in
 * light uppercase — matching the "Selected Work" grid in the reference.
 */
export default function ProjectCard({ project, priority = false }: Props) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
        <img
          src={project.image}
          alt={project.title.replace(/\.$/, '')}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-atelier group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10"
        />
      </div>
      <h3 className="mt-4 font-body text-sm font-normal uppercase tracking-[0.04em] text-ink md:text-base">
        {project.title}
      </h3>
    </article>
  );
}
