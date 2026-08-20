import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext.jsx";


export default function ProtectedRoute({
  allowedRole,
}) {

  const {
    currentUser,
    isAuthenticated,
  } = useAuth();


  if (!isAuthenticated) {

    return (

      <Navigate
        to="/login"
        replace
      />

    );

  }


  if (
    allowedRole &&
    currentUser.role !==
      allowedRole
  ) {

    return (

      <Navigate
        to="/"
        replace
      />

    );

  }


  return <Outlet />;
}