import './Header.css'

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#top" className="header-logo">JH</a>
        <nav className="header-nav">
          <a href="#top">Projects</a>
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
