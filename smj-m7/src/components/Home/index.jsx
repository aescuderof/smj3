import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../contexts/Product/ProductContext";

const Home = () => {
  const ctx = useContext(ProductContext);
  const { products, getProducts, addToCart } = ctx;

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, [products.length, getProducts]);

	// Mostrar solo los últimos 4 productos
	const latestProducts = products.slice(-4).reverse();
	return (
		<>
            <main className="container mx-auto px-4 py-5 text-center">
    <section className="bg-dust-grey-50">
  <div className="grid max-w-7xl px-4 pt-4 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:pt-8 lg:pb-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none text-dust-grey-500 md:text-5xl xl:text-5xl">
    Accesorios en piedras naturales & mostacillas miyuki</h1>
  <p className="max-w-2xl mb-6 font-light text-dust-grey-800 lg:mb-8 md:text-lg lg:text-xl">
               Expresa la alegría y color todos los días con nuestras piezas únicas.
</p>
            
  <div className="flex flex-wrap items-center justify-center gap-3">
    

    <Link to="/products" className="inline-flex items-center justify-center rounded-lg bg-dust-grey-400 px-5 py-3 text-base font-medium text-center text-dust-grey-50 transition hover:bg-dust-grey-800 focus:ring-4 focus:ring-dust-grey-300">
                  Tienda
          <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </Link>
  </div>
        </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center justify-end">
      <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl ">
        <img
          src="https://scontent.fscl38-1.fna.fbcdn.net/v/t39.30808-6/486637415_1075479534620809_3677224643258479080_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=BbgmMWo7KyMQ7kNvwFC2dbq&_nc_oc=AdkWbD9wixG-jQI662RB3Dgr-esRVy_CzaR-gwUxwX2l3SqERb4idKlIOqPoWKjkN8QyRjbFsHuFzPbKeiYMXM6m&_nc_zt=23&_nc_ht=scontent.fscl38-1.fna&_nc_gid=9lvlFhTB-GmBHPoV588CeA&oh=00_Afu9Htr7AHUK_YoqOGO5irzJZ-WU9P2QP3lc9PIm__bI5Q&oe=699FA036"
          alt="collar con coral"
          className="h-full w-full object-cover"
        />
      </div>
    </div>                
    </div>
</section>

 <section className="bg-dust-grey-100 py-16 rounded-xl">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold text-dust-grey-800">
            Nuevos ingresos
          </h2>

          <Link
            to="/products"
            className="font-medium text-dust-grey-700 transition hover:text-dust-grey-900"
          >
            Ir a la tienda →
          </Link>
        </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {latestProducts.length === 0 ? (
          <p className="col-span-full text-center text-dust-grey-500">
            No hay productos disponibles
          </p>
        ) : (
          latestProducts.map((product) => {
            const productImage = product.images?.[0] || product.img;

            return (
              <div key={product._id} className="group flex flex-col">
               
                <div className="relative overflow-hidden rounded-xl aspect-square mb-4">
                  <img
                    src={productImage}
                    alt={product.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 to-transparent" />
                  
                  {/* Price */}
                  <div className="absolute bottom-3 right-3 rounded-xl bg-dust-grey-800/55 px-3 py-2 text-sm font-semibold text-white backdrop-blur">
                    ${product.price}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-sm font-medium text-dust-grey-800 text-center min-h-5 line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/products/${product.slug}`}
                    state={{ product }}
                    className="flex-1"
                  >
                    <button className="w-full btn-product">
                      Ver collar
                    </button>
                  </Link>

               
                </div>

                
              </div>
            );
          })
        )}
      </div>
      </div>
    </section>
            </main>
           
        </>
	)
}

export default Home;