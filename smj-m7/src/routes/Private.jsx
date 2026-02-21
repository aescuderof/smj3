import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import UserContext from "../contexts/User/UserContext";

export default function PrivateRoute({ component: Component }) {
  const userCtx = useContext(UserContext);

  const { authStatus, verifyUser } = userCtx;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      return await verifyUser();
    };

    verifyToken();
    setLoading(false);
  }, [authStatus]);

  if (loading) return null;

  return (
    <>
      {authStatus ? <Component /> : <Navigate replace to="/iniciar-sesion" />}
    </>
  );
}
