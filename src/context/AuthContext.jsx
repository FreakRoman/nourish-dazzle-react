import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  users,
} from "../data/users.js";


const AuthContext =
  createContext(null);


export function AuthProvider({
  children,
}) {

  const [
    currentUser,
    setCurrentUser,
  ] = useState(() => {

    const saved =
      localStorage.getItem(
        "nourish_user"
      );

    return saved
      ? JSON.parse(saved)
      : null;

  });


  const login = (
    email,
    password
  ) => {

    const user =
      users.find(
        (item) =>
          item.email.toLowerCase() ===
            email.toLowerCase() &&
          item.password ===
            password
      );


    if (!user) {

      return {

        success: false,

        message:
          "Invalid email or password.",

      };

    }


    setCurrentUser(user);


    localStorage.setItem(
      "nourish_user",
      JSON.stringify(user)
    );


    return {

      success: true,

      user,

    };

  };


  const logout = () => {

    setCurrentUser(null);

    localStorage.removeItem(
      "nourish_user"
    );

  };


  return (

    <AuthContext.Provider
      value={{
        currentUser,

        login,

        logout,

        isAuthenticated:
          Boolean(
            currentUser
          ),
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


export function useAuth() {

  return useContext(
    AuthContext
  );

}