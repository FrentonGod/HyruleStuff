import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import logoDesktop from "./assets/logo-desktop.png";
import logoMobile from "./assets/logo-mobile.png";
import "./index.css";
import { Compendium, Landing } from "./pages";
import Item from "./pages/Item";

const Logo = () => {
  return (
    <img
      src={logoDesktop}
      alt="Logo"
      className="hidden md:block w-auto h-full cursor-pointer hover:scale-105 transition-all"
    />
  );
};

const MobileLogo = () => {
  return (
    <img
      src={logoMobile}
      alt="Mobile Logo"
      className="block md:hidden w-auto h-full cursor-pointer hover:scale-105 transition-all"
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <nav className="fixed w-full h-36 top-0 z-10 bg-gray-900 bg-opacity-75 flex justify-center">
        <div className="flex items-center justify-between h-36 max-w-7xl m-auto px-8 py-2 font-roboto fixed w-screen top-0 z-10 container mx-auto">
          <div className="logo-container h-full">
            <Link to="/">
              <Logo />
              <MobileLogo />
            </Link>
          </div>
          <ul className=" list-none flex mx-4 text-lg text-white ">
            <li className=" px-5 hover:underline transition-all">
              <Link to="/compendium">Compendio</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/compendium" element={<Compendium />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
