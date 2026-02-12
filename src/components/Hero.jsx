import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <h1 className="hero-title">Jussi Hagstrom</h1>
        <p className="hero-tagline">
          Web Developer &amp; Full Stack Engineer
        </p>
        <p className="hero-description">
          Building websites and web applications since 2016.
          From WordPress sites for Finnish businesses and festivals
          to full-stack platforms and modern React applications.
        </p>
        <div className="hero-links">
          <a
            href="https://github.com/jussiohag"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jussihagstrom"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
