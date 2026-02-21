import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatCLP } from "../../../utils/formatCLP";
import UserContext from "../../../contexts/User/UserContext";
import ProductContext from "../../../contexts/Product/ProductContext";
import { useContext, useEffect, useState } from "react";

const defaultDetails = [
  "Piedras naturales seleccionadas a mano",
  "Broches de bronce bañado en oro o plata",
  "Diseño hecho a mano en Chile",
];

const defaultCareInfo =
  "Evita el contacto directo con perfumes, agua y cremas. Guárdalo en su bolsa de tela para conservar el brillo.";

const defaultShippingInfo =
  "Realizamos envíos a todo Chile mediante courier privado. El tiempo estimado de entrega es de 3 a 5 días hábiles.";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
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
  const detailItems = product.detalles || defaultDetails;
  const careInfo = product.cuidados || defaultCareInfo;
  const shippingInfo = product.envio || defaultShippingInfo;
  const quantityOptions = [0, 1, 2, 3, 4, 5];

  return (
    <main className="max-w-5xl mx-auto pt-16 pb-24 px-6">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <section>
          <h1 className="titles">{name}</h1>
          <p className="text-dust-grey-600 mt-4">{description}</p>
          <p className="mt-4 text-xl font-semibold text-dust-grey-800">
          {formatCLP(price)}
          </p>

          {/* Select cantidad */}
          {authStatus && (
            <form onSubmit={handleSubmit} className="mt-8">
              <label className="block mb-2 font-medium text-dust-grey-500">
                Cantidad
              </label>
              <select
                className="w-32 border border-dust-grey-300 rounded-md p-2"
                value={quantity}
                onChange={handleChange}
              >
                {quantityOptions.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>

              <div className="mt-6 max-w-xs">
                <button
                  type="submit"
                  className="btn-product-secundario w-full"
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

          <div className="mt-12 space-y-8 border-t border-dust-grey-200 pt-8 text-sm text-dust-grey-700">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-dust-grey-500">Detalles</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {detailItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-dust-grey-500">Cuidados</p>
              <p className="mt-3 leading-relaxed">{careInfo}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-dust-grey-500">Envíos</p>
              <p className="mt-3 leading-relaxed">{shippingInfo}</p>
            </div>
          </div>
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
