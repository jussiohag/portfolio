import { useState, useMemo } from 'react'
import { useTheme } from './hooks/useTheme'
import Header from './components/Header'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProjectGrid from './components/ProjectGrid'
import ProjectModal from './components/ProjectModal'
import Footer from './components/Footer'
import Pong from './components/Pong'
import projects from './data/projects.json'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [page, setPage] = useState('home') // 'home' | 'pong'
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTag, setActiveTag] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    let result = projects
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }
    if (activeTag) {
      result = result.filter(p => p.tags.includes(activeTag))
    }
    return result
  }, [activeCategory, activeTag])

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} page={page} setPage={setPage} />
      {page === 'pong' ? (
        <main>
          <Pong />
        </main>
      ) : (
        <main>
          <Hero />
          <FilterBar
            projects={projects}
            activeCategory={activeCategory}
            activeTag={activeTag}
            onCategoryChange={setActiveCategory}
            onTagChange={setActiveTag}
          />
          <ProjectGrid
            projects={filteredProjects}
            onSelect={setSelectedProject}
          />
        </main>
      )}
      <Footer />
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
