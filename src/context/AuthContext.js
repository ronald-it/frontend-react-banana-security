import * as React from 'react';
import {useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = React.createContext({});

export function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    function loginUser() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd");
        history.push("/profile");
    }

    function logoutUser() {
        toggleIsAuth(false);
        console.log("Gebruiker is uitgelogd");
        history.push("/");
    }

    const data = {
        authorization: isAuth,
        toggleAuth: toggleIsAuth,
        userLogin: loginUser,
        userLogout: logoutUser,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;