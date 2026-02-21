import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { formatCLP } from "../../../utils/formatCLP";
import UserContext from "../../../contexts/User/UserContext";
import ProductContext from "../../../contexts/Product/ProductContext";

const infoSectionsFallback = {
  detalles: [
    "Piedras naturales",
    "Broches & cierres de bronce bañado en oro o plata",
    "Hecho a mano",
  ],
  cuidados:
    "Guárdalo en su bolsa de tela y evita perfumes o agua directa para conservar el brillo.",
  envio:
    "Envíos a todo Chile mediante courier privado. Tiempo estimado 3 a 5 días hábiles.",
};

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("Detalles");
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location?.state || {};

  const { authStatus, cart = [], editCart, getCart } = useContext(UserContext);
  const { setCurrentProduct } = useContext(ProductContext);

  useEffect(() => {
    if (!product) {
      navigate("/products");
      return;
    }

    setCurrentProduct(product);
    getCart();
  }, [product, navigate, setCurrentProduct, getCart]);

  const detailSections = useMemo(() => {
    if (!product) return [];
    return [
      {
        title: "Detalles",
        type: "list",
        items: product.detalles || infoSectionsFallback.detalles,
      },
      {
        title: "Cuidados",
        type: "text",
        copy: product.cuidados || infoSectionsFallback.cuidados,
      },
      {
        title: "Envío",
        type: "text",
        copy: product.envio || infoSectionsFallback.envio,
      },
    ];
  }, [product]);

  if (!product) return null;

  const displayName = product.nombre ?? product.name;
  const displayDescription = product.descripcion ?? product.description ?? "";
  const displayPrice = product.precio ?? product.price ?? 0;
  const displayImage = product.images?.[0] ?? product.img;
  const priceID = product.priceID ?? product._id;
  const quantityOptions = [1, 2, 3, 4, 5];

  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = {
      priceID,
      name: displayName,
      quantity,
      price: displayPrice,
      image: displayImage,
      slug: product.slug,
    };

    const existingItemIndex = cart.findIndex(
      (el) => el.priceID === item.priceID
    );

    const updatedCart =
      existingItemIndex !== -1
        ? cart.map((el, i) =>
            i === existingItemIndex ? { ...el, quantity: item.quantity } : el
          )
        : [...cart, item];

    await editCart(updatedCart);
  };

  const toggleSection = (title) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <section className="flex flex-col gap-6 text-left">
          <nav className="text-sm text-dust-grey-500">
            <Link to="/products" className="transition hover:text-dust-grey-800">
              Tienda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-dust-grey-900">{displayName}</span>
          </nav>

          <div>
            <h1 className="text-3xl font-semibold text-dust-grey-900 md:text-4xl">
              {displayName}
            </h1>
            <p className="mt-3 text-base text-dust-grey-700">
              {displayDescription}
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-dust-grey-500">
              Precio
            </p>
            <p className="text-3xl font-semibold text-dust-grey-900">
              {formatCLP(displayPrice)}
            </p>
          </div>

          {authStatus ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-dust-grey-200 p-4"
            >
              <div className="flex flex-col gap-2 text-sm font-medium text-dust-grey-700">
                <label htmlFor="quantity">Cantidad</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    id="quantity"
                    className="w-full rounded-xl border border-dust-grey-300 bg-white px-3 py-2 text-base text-dust-grey-900 focus:border-dust-grey-500 focus:outline-none sm:w-32"
                    value={quantity}
                    onChange={handleChange}
                  >
                    {quantityOptions.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="btn-product flex-1">
                    {cart.length ? "Actualizar carrito" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <Link to="/registro" className="block">
              <button className="btn-product w-full sm:w-auto">
                Regístrate para comprar
              </button>
            </Link>
          )}

          <div className="divide-y divide-dust-grey-200 border-t border-b border-dust-grey-200">
            {detailSections.map((section) => (
              <div key={section.title}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-dust-grey-800"
                  onClick={() => toggleSection(section.title)}
                >
                  {section.title}
                  <span className="text-lg text-dust-grey-500">
                    {openSection === section.title ? "−" : "+"}
                  </span>
                </button>
                {openSection === section.title && (
                  <div className="pb-4 text-sm text-dust-grey-600">
                    {section.type === "list" ? (
                      <ul className="list-disc space-y-1 pl-5">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{section.copy}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <figure className="flex items-start justify-center">
          <div className="aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-dust-grey-200 shadow-lg">
            <img
              src={displayImage}
              alt={displayDescription}
              className="h-full w-full object-cover"
            />
          </div>
        </figure>
      </div>
    </main>
  );
};

export default SingleProduct;