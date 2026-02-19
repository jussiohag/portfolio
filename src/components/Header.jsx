import './Header.css'

export default function Header({ theme, toggleTheme, page, setPage }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <button className="header-logo" onClick={() => setPage('home')}>JH</button>
        <nav className="header-nav">
          <button
            className={`nav-link ${page === 'home' ? 'active' : ''}`}
            onClick={() => setPage('home')}
          >
            Projects
          </button>
          <button
            className={`nav-link ${page === 'pong' ? 'active' : ''}`}
            onClick={() => setPage('pong')}
          >
            Pong
          </button>
          <a href="#contact">Contact</a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  )
}
