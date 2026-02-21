import { Link, useLocation } from "react-router-dom";
import { formatCLP } from "../../../utils/formatCLP";
import UserContext from "../../../contexts/user/UserContext";
import ProductContext from "../../../contexts/product/ProductContext";
import { useContext, useEffect, useState } from "react";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { product } = location?.state;

  const userCtx = useContext(UserContext);
  const { authStatus, cart, editCart, getCart } = userCtx;

  const { setCurrentProduct } = useContext(ProductContext);

  useEffect(() => {
    if (!product) {
      // Si el usuario recarga la página y no hay data, redirigir
      navigate("/products");
      return;
    }

    setCurrentProduct(product);
    getCart();
  }, []);

  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity === 0) return;

    const item = {
      priceID: product.priceID,
      name: product.name,
      quantity,
      price: product.price,
      img: product.img,
      slug: product.slug,
    };

    const existingItemIndex = cart.findIndex(
      (el) => el.priceID === item.priceID
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      // Si ya existe, actualiza la cantidad
      updatedCart = cart.map((el, i) =>
        i === existingItemIndex ? { ...el, quantity: item.quantity } : el
      );
    } else {
      // Si no existe, agrega el nuevo ítem
      updatedCart = [...cart, item];
    }

    await editCart(updatedCart);
  };

  if (!product) return null;
  const { name, description, img, price } = product;
  const quantityOptions = [0, 1, 2, 3, 4, 5];

  return (
    <main className="max-w-5xl mx-auto pt-16 pb-24 px-6">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <section>
          <h1 className="text-4xl font-bold">{name}</h1>
          <p className="text-gray-600 mt-4">{description}</p>
          <p className="mt-4 text-xl font-semibold">
            Precio: {formatCLP(price)}
          </p>

          {/* Select cantidad */}
          {authStatus && (
            <form onSubmit={handleSubmit} className="mt-8">
              <label className="block mb-2 font-medium text-gray-700">
                Cantidad
              </label>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <select
                  className="w-full rounded-md border border-gray-300 p-2 sm:w-32"
                  value={quantity}
                  onChange={handleChange}
                >
                  {quantityOptions.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="btn-product w-full sm:flex-1"
                  disabled={quantity === 0}
                >
                  {cart.length ? "Modificar carrito" : "Agregar al carrito"}
                </button>
              </div>
            </form>
          )}

          {!authStatus && (
            <Link to="/registro">
              <button className="btn-product mt-6">
                Regístrate para comprar
              </button>
            </Link>
          )}
        </section>

        {/* Imagen */}
        <figure>
          <img
            src={img}
            alt={description}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </figure>
      </div>
    </main>
  );
};

export default SingleProduct;
