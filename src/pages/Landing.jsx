import { Link } from "react-router-dom";
import landingImage from "../assets/hyrule.png";

const Landing = () => {
  return (
    <section className="relative h-screen flex flex-col items-center">
      <img
        className="absolute h-screen w-full object-cover z-0 filter brightness-105"
        src={landingImage}
        alt=""
      />
      <div className="text-center z-10 mt-40 sm:mt-60 mx-auto max-w-[80%]">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 ">
          ¡Navega a traves del {" "}
          <span className="text-orange-700 ">compendio de Hyrule!</span>
        </h1>
        <p className="mb-8 md:text-gray-800 text-xl md:text-2xl font-semibold max-w-[60%] mx-auto ">
          Accede a una enciclopedia completa de animales, criaturas, armas y más
          que se encuentran dentro del videojuego Zelda Breath Of The Wild
        </p>
        <Link
          to="/compendium"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-900 transition-all duration-75 ease-linear text-white rounded-lg font-bold"
        >
          Acceso al compendio
        </Link>
      </div>
    </section>
  );
};

export default Landing;
