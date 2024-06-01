import React from "react";
const Contacto = () => {
  return (
    <>
      <div className="about-us">
        <h3 className="title3">Contacto</h3>
        <p className="parr1">
          En Nourish Net, estamos aquí para servirte y apoyarte en todo lo que
          necesites. Si tienes preguntas, comentarios o sugerencias, no dudes en
          ponerte en contacto con nuestro equipo. Estamos aquí para ayudarte y
          trabajar juntos para hacer del mundo un lugar mejor.
        </p>
        <p className="parr1">
          Correo electrónico de contacto: info@nourishnet.com <br />
          Teléfono de contacto: +591 74010203 <br />
          Dirección: Av. Mariscal Santa Cruz, La Paz Bolivia.
        </p>
        <iframe
          title="contact-map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1704.0397599715216!2d-68.13117799957274!3d-16.50387525013958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sbo!4v1710634591751!5m2!1ses!2sbo"
          max-width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Contacto;
