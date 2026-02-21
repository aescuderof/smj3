const UserReducer = (globalState, action) => {
    switch (action.type) {
        case "REGISTRO_EXITOSO":
            return {
                ...globalState,
                mensaje: "Usuario creado correctamente"
            }
            
        case "LOGIN_EXITOSO":
            localStorage.setItem("token", action.payload)

            return {
                ...globalState,
                authStatus: true
            }
        
        case "OBTENER_USUARIO":
            return {
                ...globalState,
                authStatus: true,
                currentUser: action.payload
            }

        case "CERRAR_SESION":
            localStorage.removeItem('token')
            
            return {
                ...globalState,
                currentUser: null,
                authStatus: false,
                loading: false
            }

        case "CHANGE_STATUS_LOADING":
            return {
                ...globalState,
                globalLoading: action.payload
            }    

        case "GET_CHECKOUT_SESSION":
            return {
                ...globalState,
                sessionURL: action.payload
            }

        case "GET_CART":
            return {
                ...globalState,
                cart: action.payload
            }

        default:
            return globalState;
    }
}

export default UserReducer;