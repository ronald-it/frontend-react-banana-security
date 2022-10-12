import * as React from 'react';
import {useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = React.createContext({});

export function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        authorization: false,
        user: null,
    });
    const history = useHistory();

    function loginUser(token) {
        toggleIsAuth({
            authorization: true,
        });
        console.log("Gebruiker is ingelogd");
        history.push("/profile");
        console.log(token);
        localStorage.setItem('token', token);

    }

    function logoutUser() {
        toggleIsAuth({
            authorization: false,
        });
        console.log("Gebruiker is uitgelogd");
        history.push("/");
    }

    const data = {
        authorization: isAuth.authorization,
        toggleAuth: toggleIsAuth,
        userLogin: loginUser,
        userLogout: logoutUser,
        user: isAuth.user,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;