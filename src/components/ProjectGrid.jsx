import ProjectCard from './ProjectCard'
import './ProjectGrid.css'

export default function ProjectGrid({ projects, onSelect }) {
  if (projects.length === 0) {
    return (
      <div className="container">
        <p className="grid-empty">No projects match the current filters.</p>
      </div>
    )
  }

  return (
    <section className="project-grid-section">
      <div className="container">
        <div className="project-grid">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
