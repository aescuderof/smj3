import { useContext, useEffect } from "react";
import ProductContext from "../../../contexts/Product/ProductContext";
import { Link } from "react-router-dom";

const ProductList = () => {
    const ctx = useContext(ProductContext);
    const { products, getProducts } = ctx;
    
    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <section className="max-w-7xl mx-auto py-16 px-8 grid grid-cols-1 gap-y-4 gap-x-12 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-2 flex-column">
                {products.length === 0 ? (
                    <p>No hay products disponibles</p>
                ) : (
                    products.map(product => {
                        return (
                            <div key={product._id} className="border flex flex-col">
                                <div className="bg-gray-200">
                                    <Link to={`/products/${product.slug}`} state={{ product }}>
                                        <img
                                            src={product.img}
                                            alt={product.description}
                                            className="w-full h-96 object-center object-cover"
                                        />
                                    </Link>
                                </div>
                                <div className="flex-1 p-4 space-y-2 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                                    <p className="text-gray-500 pb-8">{product.description}</p>
                                    <Link to={`/products/${product.slug}`} state={{ product }} className="btn-product">
                                        <button type="button" className="w-full">Ver productra</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                )}
            </section>
        </>
    )
}

export default ProductList;