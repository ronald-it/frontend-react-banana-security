import * as React from 'react';
import {Route} from "react-router-dom";

export function PrivateRoute({authorization , children, ...rest}) {
    return (
        <Route {...rest}>
            {authorization === true && children}
        </Route>
    );
};