import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import '../App.css';

//export default function Navbar() {

class Navbar extends Component{
    state={clicked: false}

    handleClick=() =>{        this.setStated({clicked: !this.state.clicked})
    }
render(){
    return (
        <nav className="NavbarItems">
            <a class="navbar-brand" href="#">Tienda Webtickers</a>
            <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                <li>
                    <Link to="/Productos" className="cName">Productos</Link>
                </li>
                <li>
                    <Link to="/Ventas" className="cName">Ventas</Link>
                </li>
                <li>
                    <Link to="/Usuarios" className="cName">Usuarios</Link>
                </li>
            </ul>
            

        </nav>
    )
}
}
export default Navbar;

