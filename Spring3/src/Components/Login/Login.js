import React, { Fragment } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () =>{
    const { loginWithRedirect } = useAuth0();
    return (
        <Fragment>
    <h1>Autenticación de Usuarios</h1>
    <button onClick={() => loginWithRedirect()}>Login</button>;
    </Fragment>
    )
};