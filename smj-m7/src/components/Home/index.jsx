import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <main className="text-center px-4 mt-24 mx-auto">
                <h1 className="text-5xl font-extrabold text-gray-900">Aplicacion de products</h1>
                <p className="mt-3 mx-auto text-gray-500">Accede al menu y revisa todas nuestras products.</p>
                <section className="mt-16 mx-auto max-w-md">
                    <article>
                        <Link to='/products' className="btn-product">Ver el menu de products</Link>
                    </article>
                </section>
            </main>
        </>
    )
}

export default Home;