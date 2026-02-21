import { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/User/UserContext";

export default function Header() {
  const {
    currentUser,
    cart,
    authStatus,
    verifyUser,
    logout,
    getCart,
    setLoading,
  } = useContext(UserContext);

  const [total, setTotal] = useState(0);

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
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotal(totalItems);
  }, [cart]);

  return (
 <header className="relative z-50 bg-dust-grey-50">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
        <ul className="flex items-center gap-8">
          <li className="ml-10 flex items-center gap-3 text-xl font-semibold text-dust-grey-900">
            <Link to="/" className="font-medium">
                <span>Señorita María Joyas</span>
            </Link>

            <Link
              to="/"
              className="text-lg font-light text-dust-grey-700 transition hover:text-dust-grey-500"
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className="text-lg font-light text-dust-grey-700 transition hover:text-dust-grey-500"
            >
              Tienda
            </Link>
          </li>
        </ul>

        <section className="flex items-center justify-end gap-4">
          {authStatus ? (
            <>
              <Link to="/perfil" className="px-6 py-3 h-12 min-w-20 flex items-center gap-2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="#A3A3A3"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-3.313 3.134-6 8-6s8 2.687 8 6" />
                </svg>
                Perfil
              </Link>

              <Link to="/" className="btn-nav" onClick={logout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </Link>

              <Link to="/carrito" className="btn-cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span className="btn-cart-quantity">{total}</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/registro" className="btn-nav">
                Crear cuenta
              </Link>
              <Link to="/iniciar-sesion" className="btn-nav">
                Iniciar sesión
              </Link>
            </>
          )}
        </section>
      </nav>
    </header>
  );
}
