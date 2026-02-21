const ProductReducer = (globalState, action) => {
    switch (action.type) {
        case "OBTENER_PRODUCTS":
            return {
                ...globalState,
                products: action.payload
            }
        
        case "OBTENER_PRODUCT":
            return {
                ...globalState,
                currentProduct: action.payload
            }

        default:
            return globalState;
    }
}

export default ProductReducer;