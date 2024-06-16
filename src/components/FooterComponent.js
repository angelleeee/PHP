import '../assets/styles/FooterStyle.css'
const FooterComponent = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contacto</h4>
            <p><a href="mailto:leeverde9@gmail.com">leeverde9@gmail.com</a></p>
            <p><a href="mailto:Simonynoa34@gmail.com">Simonynoa34@gmail.com</a></p>
          </div>
          <div className="footer-section">
            <h4>Autores</h4>
            <p>Angel Lee</p>
            <p>Agustín Avila</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  };
export default FooterComponent
