import React from "react";
import "./Nosotros.css";
import about1 from "../components/assets/about1.jpg";
const Nosotros = () => {
  return (
    <div className="about-us">
      <h3 className="title3">Nosotros</h3>
      <p>
        Bienvenido a Nourish Net: Conectando Corazones, Alimentos y Esperanza.
      </p>
      <p>
        En Nourish Net, creemos en la fuerza de la comunidad para generar un
        impacto positivo. Nuestra plataforma digital ha sido diseñada con un
        propósito claro: reunir a donantes generosos con aquellas personas que
        necesitan apoyo alimentario, construyendo puentes de solidaridad y
        compartiendo el amor a través de la comida.
      </p>
      <img src={about1} alt=""  />

      <p>
        Nuestro enfoque es simple pero poderoso: facilitar la conexión entre
        quienes desean dar y quienes necesitan recibir. Desde individuos
        caritativos hasta organizaciones benéficas, Nourish Net ofrece una
        plataforma inclusiva donde todos pueden contribuir de manera
        significativa.
      </p>
      <p>
        ¿Cómo funciona? Es sencillo. Los donantes pueden registrarse en nuestra
        plataforma, especificar los alimentos que desean donar y cuándo están
        disponibles. Los voluntarios también son bienvenidos para ofrecer su
        tiempo y habilidades en la distribución de alimentos o en otras
        actividades de apoyo.
      </p>
      <p>
        Por otro lado, las organizaciones benéficas y las personas que necesitan
        alimentos pueden registrarse para recibir donaciones. Nuestra plataforma
        hace que sea fácil encontrar alimentos frescos y nutritivos para
        aquellos que más lo necesitan, ayudando a aliviar las preocupaciones
        sobre la seguridad alimentaria y promoviendo el bienestar de la
        comunidad.
      </p>
      <p>
        En Nourish Net, creemos que cada comida compartida es un acto de
        compasión y solidaridad. Cada donación no solo nutre el cuerpo, sino
        también el alma, extendiendo una mano amiga a quienes atraviesan tiempos
        difíciles.
      </p>
      <p>
        Únete a nosotros en esta misión de alimentar corazones y transformar
        vidas. Juntos, podemos hacer una diferencia significativa en el mundo,
        un plato a la vez.
      </p>
      <p>¡Gracias por ser parte de la familia Nourish Net!</p>
    </div>
  );
};

export default Nosotros;
