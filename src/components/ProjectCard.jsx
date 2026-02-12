import './ProjectCard.css'

export default function ProjectCard({ project, onClick }) {
  const screenshotSrc = project.screenshot === 'placeholder.svg'
    ? `${import.meta.env.BASE_URL}screenshots/placeholder.svg`
    : `${import.meta.env.BASE_URL}screenshots/${project.screenshot}`

  return (
    <article className="project-card" onClick={() => onClick(project)}>
      <div className="card-image">
        <img
          src={screenshotSrc}
          alt={`Screenshot of ${project.name}`}
          loading="lazy"
        />
        {project.featured && <span className="card-badge">Featured</span>}
      </div>
      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{project.name}</h3>
          <span className="card-year">{project.year}</span>
        </div>
        <p className="card-description">{project.description}</p>
        <div className="card-tags">
          {project.tags.map(tag => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
