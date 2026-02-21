import { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import axiosClient from "../../config/axios";

const UserState = (props) => {
    const initialState = {
        currentUser: {
            username: "",
            email: "",
            country: "",
            address: "",
            zipcode: 0
        },
        cart: [],
        authStatus: false,
        sessionURL: null,
        globalLoading: false
    };

    const [globalState, dispatch] = useReducer(UserReducer, initialState);

    const registerUser = async (form) => {
        try {
            const response = await axiosClient.post('/users/register', form);
            console.log('respuesta del registro', response);

            dispatch({
                type: "REGISTRO_EXITOSO",
                payload: response.data
            })
            return;
        } catch (error) {
            console.error(error);
            return error.response.data.message;
        }
    }

    const loginUser = async (form) => {
        try {
            const res = await axiosClient.post('/users/login', form);
            console.log('respuesta login', res.data.token);
            const token = res.data.token;

            dispatch({
                type: "LOGIN_EXITOSO",
                payload: token
            })
            return;
        } catch (error) {
            console.error(error);
            return error.response.data.message
        }
    }

    const verifyUser = async () => {
        const token = localStorage.getItem('token');

        if (token){
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
        } else {
            delete axiosClient.defaults.headers.common['Authorization']
        }
        try {
            const response = await axiosClient.get('/users/verify-user');

            dispatch({
                type: "OBTENER_USUARIO",
                payload: response.data.user
            })
        } catch (error) {
            return;
        }
    }

    const updateUser = async (form) => {
        const token = localStorage.getItem('token');

        if (token){
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
        } else {
            delete axiosClient.defaults.headers.common['Authorization']
        }
        await axiosClient.put('/users/update', form);
    }

    const logout = async () => {
        dispatch({
            type: "CERRAR_SESION"
        })
    }

    const setLoading = (status) => {
        dispatch({
            type: "CHANGE_STATUS_LOADING",
            payload: status
        })
    }

    const getCheckoutSession = async () => {
        const token = localStorage.getItem('token');

        if (token){
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
        } else {
            delete axiosClient.defaults.headers.common['Authorization']
        }
        try {
            const response = await axiosClient.get('/carts/create-checkout-session');

            dispatch({
                type: "GET_CHECKOUT_SESSION",
                payload: response.data.session_url
            })
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const getCart = async () => {
        const token = localStorage.getItem('token');

        if (token){
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
        } else {
            delete axiosClient.defaults.headers.common['Authorization']
        }

        try {
            const response = await axiosClient.get('/carts/get-cart');
            console.log('respuesta del carrito', response);
            dispatch({
                type: "GET_CART",
                payload: response.data.cart.products
            })
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const editCart = async (data) => {
        const token = localStorage.getItem('token');

        if (token){
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
        } else {
            delete axiosClient.defaults.headers.common['Authorization']
        }

        try {
            const response = await axiosClient.put('/carts/edit-cart', { products: data });
            await getCart();
            return response.data.msg;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    return (
        <UserContext.Provider
            value={{
                currentUser: globalState.currentUser,
                cart: globalState.cart,
                authStatus: globalState.authStatus,
                globalLoading: globalState.globalLoading,
                sessionURL: globalState.sessionURL,
                registerUser,
                loginUser,
                verifyUser,
                updateUser,
                logout,
                setLoading,
                getCheckoutSession,
                getCart,
                editCart
            }}        
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;