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
            <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                <li>
                    <Link to="/" className="cName">Login</Link>
                </li>
                <li>
                    <Link to="/Logout" className="cName">Logout</Link>
                </li>
                <li>
                    <Link to="/Productos" className="cName">Productos</Link>
                </li>
            </ul>
            

        </nav>
    )
}
}
export default Navbar;
