import React  from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';


export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    
    return (
        <div className="login">
            <h2>Iniciar sesión</h2>
            <br />
           

                <img className="logo" src="webtic.png" alt="Webtickrs"/>
            <br />
            <button className="Login" onClick={() => loginWithRedirect()}>Login</button>
            
            
        </div>
    )
};