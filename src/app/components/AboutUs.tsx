import '../styles/AboutUs/AboutUs.css';

function AboutUs() {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <h2 className="about-title">Acerca de Nosotros</h2>
        <p className="about-subtitle">Artesanía con alma, muebles con historia</p>
        <p className="about-text">
          En Bastet creemos que cada pieza de mobiliario cuenta una historia.
          Somos artesanos dedicados a la creación de muebles únicos, elaborados
          a mano con maderas nobles y materiales de la más alta calidad.
        </p>
        <p className="about-text">
          Nuestra inspiración nace de la elegancia atemporal, combinando técnicas
          tradicionales con un diseño contemporáneo que transforma cualquier espacio
          en un lugar lleno de carácter y distinción.
        </p>
      </div>
      <div className="about-image-wrapper">
        <img src="/about/workshop.jpg" alt="Nuestro taller" className="about-image" />
      </div>
    </section>
  );
}

export default AboutUs;
