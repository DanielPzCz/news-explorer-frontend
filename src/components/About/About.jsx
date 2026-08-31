import "./About.css";
import authorPhoto from "../../images/author.jpg";

export default function About() {
  return (
    <section className="about">
      <img alt="Fotografía del autor" className="about__photo" src={authorPhoto} />
      <div className="about__info">
        <h2 className="about__title">Acerca del autor</h2>
        <p className="about__text">
          Soy Daniel, desarrollador web full-stack formado en el bootcamp de
          TripleTen. Trabajo con HTML y CSS semánticos, JavaScript, React y
          Node.js con Express y MongoDB, construyendo aplicaciones completas
          desde la interfaz hasta la API.
        </p>
        <p className="about__text">
          Durante el programa desarrollé proyectos como "Around the U.S.", una
          aplicación full-stack con autenticación JWT y una API propia. Me
          gusta escribir código limpio y bien organizado, y disfruto convertir
          diseños en interfaces funcionales y responsivas que resuelvan
          problemas reales.
        </p>
      </div>
    </section>
  );
}
