import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-inner">
        <div className="footer-info">
          <h2 className="footer-title">Get in Touch</h2>
          <p className="footer-text">
            Interested in working together? Feel free to reach out.
          </p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/jussihagstrom"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jussihagstrom"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Jussi Hagstrom
        </p>
      </div>
    </footer>
  )
}
