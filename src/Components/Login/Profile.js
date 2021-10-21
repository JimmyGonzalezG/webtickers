import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
import "react-json-pretty/themes/monikai.css"

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <div> Cargando...</div>;
    }
    else
        return (
            isAuthenticated && (
                <div>
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <p>{user.name}</p>
                        <p>Email:{user.email}</p>
                        <p>{user.profile}</p>


                    </div>
                    <div>
                        <JSONPretty data={user} />;
                    </div>
                </div>
            )
        );

}