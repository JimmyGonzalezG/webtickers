import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
    const {user,isAuthenticated,isLoading} = useAuth0();
    if(isLoading){
        return <div> Cargaando...</div>;
    }
    else
    return(
        isAuthenticated && (
        <div>
                <img src={user.picture} alt={user.name}/>
                <p>{user.name}</p>
                <p>Email:{user.email}</p>
                <p>{user.profile}</p>

        </div>
        )
    );

}