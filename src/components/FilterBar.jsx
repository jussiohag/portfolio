import { useMemo } from 'react'
import './FilterBar.css'

const CATEGORIES = [
  { key: 'all', label: 'All Projects' },
  { key: 'wordpress', label: 'WordPress' },
  { key: 'saas', label: 'SaaS / Business' },
  { key: 'coding', label: 'Coding' },
]

export default function FilterBar({ projects, activeCategory, activeTag, onCategoryChange, onTagChange }) {
  const tags = useMemo(() => {
    const filtered = activeCategory === 'all'
      ? projects
      : projects.filter(p => p.category === activeCategory)
    const tagSet = new Set()
    filtered.forEach(p => p.tags.forEach(t => tagSet.add(t)))
    return [...tagSet].sort()
  }, [projects, activeCategory])

  return (
    <div className="filter-bar" id="projects">
      <div className="container">
        <div className="filter-categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`filter-pill ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => {
                onCategoryChange(cat.key)
                onTagChange(null)
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {tags.length > 0 && (
          <div className="filter-tags">
            {tags.map(tag => (
              <button
                key={tag}
                className={`filter-tag ${activeTag === tag ? 'active' : ''}`}
                onClick={() => onTagChange(activeTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
