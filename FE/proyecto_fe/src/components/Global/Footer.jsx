import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h4>Centro Cívico La Capri</h4>
          <p>
            Fortaleciendo nuestra comunidad a través de la educación y la
            participación ciudadana.
          </p>
        </div>
        <div>
          <h4>Enlaces Rápidos</h4>
          <a href="/about">Sobre Nosotros</a>
          <a href="/courses">Cursos</a>
          <a href="/contact">Contacto</a>
        </div>
        <div>
          <h4>Contacto</h4>
          <p>📍 Barrio La Capri, San José</p>
          <p>📞 2234-5678</p>
          <p>✉️ info@centrocivicollacapri.cr</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
