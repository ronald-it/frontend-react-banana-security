import * as React from 'react';
import {useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const AuthContext = React.createContext({});

export function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        authorization: false,
        user: null,
    });
    const history = useHistory();


    async function fetchUserData(id, token) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log(result);
            console.log(token);
            console.log("test test test");
        } catch (e) {
            console.error(e);
            console.log(token);
            console.log("test test test");
        }
    }

    function loginUser(token) {
        toggleIsAuth({
            authorization: true,
        });
        console.log("Gebruiker is ingelogd");
        history.push("/profile");
        console.log(token);
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);
        console.log(decoded);
        const id = decoded.sub;
        console.log(id);
        fetchUserData(id, token);
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