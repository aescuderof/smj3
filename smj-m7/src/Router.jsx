import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import UserState from "./contexts/User/UserState";
import ProductState from "./contexts/Product/ProductState";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ProductList from "./components/Product/List";
import SingleProduct from "./components/Product/Single";
import AuthRoute from "./routes/Auth";
import PrivateRoute from "./routes/Private";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/ErrorPage';

const Router = () => {
  return (
    <UserState>
      <ProductState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:slug" element={<SingleProduct />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/pago-exitoso" element={<SuccessPage />} />
              <Route path="/pago-cancelado" element={<CancelPage />} />

              <Route
                path="/iniciar-sesion"
                element={<AuthRoute component={Login} />}
              />
              
              <Route
                path="/carrito"
                element={<PrivateRoute component={Checkout} />} 
              />

              <Route 
                path="/perfil"
                element={<PrivateRoute component={Profile} />}
              />

            </Route>
          </Routes>
        </BrowserRouter>
      </ProductState>
    </UserState>
  );
};

export default Router;
