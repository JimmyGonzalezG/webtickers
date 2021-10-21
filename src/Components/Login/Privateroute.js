import React from 'react'
import { Route, Redirect } from 'react-router-dom'

//const user =null;
const user ={id:1, usuario: "j76gonzalez@gmail.com"};

export default function Privateroute({component:Component, ...rest}) {
    return (
        <Route {...rest} >{user ? <Component /> : <Redirect to="/"/>} </Route>
    );
}
