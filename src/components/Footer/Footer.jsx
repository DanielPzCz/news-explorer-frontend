import { Link } from "react-router";
import "./Footer.css";
import githubIcon from "../../images/github.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div className="footer__navigation">
        <ul className="footer__links">
          <li className="footer__item">
            <Link className="footer__link" to="/">
              Inicio
            </Link>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://tripleten.com"
              target="_blank"
              rel="noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__socials">
          <li className="footer__item">
            <a
              aria-label="GitHub"
              className="footer__social-link"
              href="https://github.com/DanielPzCz"
              target="_blank"
              rel="noreferrer"
            >
              <img alt="" className="footer__social-icon" src={githubIcon} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
