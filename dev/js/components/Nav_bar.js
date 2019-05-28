import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

const Nav_bar = () => {
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href="/">
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Link to="/">בית</Link>
                    <Link to="/request">בקשת כיתה</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav_bar;