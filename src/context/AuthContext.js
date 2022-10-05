import * as React from 'react';
import {useState} from "react";

export const AuthContext = React.createContext({});

export function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState(false);

    const data = {
        authorization: isAuth,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;