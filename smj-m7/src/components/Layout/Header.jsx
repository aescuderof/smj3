import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/User/UserContext";

const navLinks = [
  { path: "/", label: "Inicio" },
  { path: "/products", label: "Tienda" },
];

const iconBase = "h-6 w-6 stroke-current";

export default function Header() {
  const { currentUser, cart, authStatus, verifyUser, logout, getCart, setLoading } =
    useContext(UserContext);

  const [total, setTotal] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    verifyUser();
    getCart();
    setLoading(false);
  }, []);

  useEffect(() => {
    getCart();
  }, [currentUser]);

  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cart]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative z-50 bg-dust-grey-50 border-b border-dust-grey-100">
      <div className="relative flex items-center justify-center px-6 py-5 lg:px-10">
        <Link to="/" className="text-xl font-semibold text-dust-grey-900 text-center">
          Señorita María Joyas
        </Link>
        <button
          type="button"
          className="absolute right-6 top-1/2 -translate-y-1/2 lg:hidden rounded-lg border border-dust-grey-200 p-2 text-dust-grey-900 hover:bg-dust-grey-100 transition"
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <svg className={iconBase} fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className={iconBase} fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`${isMenuOpen ? "flex" : "hidden"} flex-col gap-6 px-6 pb-6 text-dust-grey-900 lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:pb-5`}
      >
        <ul className="flex flex-col gap-4 text-lg font-light text-dust-grey-700 lg:flex-row lg:gap-8">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className="transition hover:text-dust-grey-500" onClick={closeMenu}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <section className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
          {authStatus ? (
            <>
              <Link
                to="/perfil"
                className="px-6 py-3 h-12 min-w-20 flex items-center gap-2 border border-dust-grey-200 rounded-lg text-sm font-medium text-dust-grey-800 hover:bg-dust-grey-100"
                onClick={closeMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#A3A3A3" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-3.313 3.134-6 8-6s8 2.687 8 6" />
                </svg>
                Perfil
              </Link>

              <button
                className="px-6 py-3 h-12 min-w-20 flex items-center gap-2 border border-dust-grey-200 rounded-lg text-sm font-medium text-dust-grey-800 hover:bg-dust-grey-100 text-left"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar sesión
              </button>

              <Link
                to="/carrito"
                className="px-6 py-3 h-12 min-w-20 flex items-center gap-2 btn-nav"
                onClick={closeMenu}
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span className="btn-cart-quantity">{total}</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/registro"
                className="btn-nav-secundario px-6 py-3 h-12 min-w-20 flex items-center justify-center gap-2 w-full"
                onClick={closeMenu}
              >
                Crear cuenta
              </Link>
              <Link
                to="/iniciar-sesion"
                className="btn-nav px-6 py-3 h-12 min-w-20 flex items-center justify-center gap-2 w-full"
                onClick={closeMenu}
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </section>
      </div>
    </header>
  );
}