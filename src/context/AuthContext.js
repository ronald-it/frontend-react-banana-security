import * as React from 'react';
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const AuthContext = React.createContext({});

export function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        authorization: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    useEffect(() => {
            const token = localStorage.getItem('token');
            console.log(token);
            const decoded = jwt_decode(token);
            console.log(decoded);
            const id = decoded.sub;
            console.log(id);

            async function fetchUserData() {
                try {
                    const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            }
                        }
                    );
                    console.log(response);
                    toggleIsAuth({
                            user: {
                                username: response.data.username,
                                email: response.data.email,
                                id: response.data.id,
                            },
                            authorization: true,
                            status: 'done',
                        }
                    )

                } catch (e) {
                    console.error(e);
                    toggleIsAuth({
                            authorization: false,
                            user: null,
                            status: 'done',
                        }
                    );
                }
            }

            fetchUserData();
        },
        []
    )

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
            toggleIsAuth({
                    authorization: true,
                    user: {
                        username: result.data.username,
                        email: result.data.email,
                        id: result.data.id,
                    }
                }
            )
            history.push("/profile")
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
            user: null,
        });
        localStorage.removeItem('token');
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
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;