import { useEffect, useRef } from 'react'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Focus the modal content for accessibility
    contentRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const screenshotSrc = project.screenshot === 'placeholder.svg'
    ? `${import.meta.env.BASE_URL}screenshots/placeholder.svg`
    : `${import.meta.env.BASE_URL}screenshots/${project.screenshot}`

  const categoryLabel = {
    wordpress: 'WordPress',
    saas: 'SaaS / Business',
    coding: 'Coding Project',
  }

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div
        className="modal-content"
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-label={project.name}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="modal-image">
          <img src={screenshotSrc} alt={`Screenshot of ${project.name}`} />
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">{project.name}</h2>
            <div className="modal-meta">
              <span className="modal-category">{categoryLabel[project.category]}</span>
              <span className="modal-year">{project.year}</span>
              <span className="modal-role">{project.role}</span>
            </div>
          </div>

          <p className="modal-description">{project.longDescription}</p>

          {project.achievements.length > 0 && (
            <div className="modal-section">
              <h3>Key Highlights</h3>
              <ul className="modal-achievements">
                {project.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-tags">
            {project.tags.map(tag => (
              <span key={tag} className="modal-tag">{tag}</span>
            ))}
          </div>

          {Object.keys(project.links).length > 0 && (
            <div className="modal-links">
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="modal-link">
                  Visit Site
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="modal-link">
                  GitHub
                </a>
              )}
              {project.links.wayback && (
                <a href={project.links.wayback} target="_blank" rel="noopener noreferrer" className="modal-link modal-link-secondary">
                  Wayback Machine
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
