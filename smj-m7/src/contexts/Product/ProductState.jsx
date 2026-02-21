import { useReducer } from 'react';
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import axiosClient from '../../config/axios';

const ProductState = (props) => {
    const initialState = {
        products: [],
        currentProduct: {
            _id: null,
            idProd: '',
            name: '',
            img: '',
            price: '',
            description: '',
            slug: ''
        }
    }

    const [globalState, dispatch] = useReducer(ProductReducer, initialState);

    const getProducts = async () => {
        try {
            const response = await axiosClient.get('/products');
            console.log('endpoint obtener products', response);

            dispatch({
                type: "OBTENER_PRODUCTS",
                payload: response.data.products
            })
        } catch (error) {
            console.error(error);
        }
    }

    const setCurrentProduct = (productData) => {
        dispatch({
            type: "OBTENER_PRODUCT",
            payload: productData
        })
    }

    return (
        <ProductContext.Provider
            value={{
                products: globalState.products,
                currentProduct: globalState.currentProduct,
                getProducts,
                setCurrentProduct
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;