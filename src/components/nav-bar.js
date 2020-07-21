import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

export const NavBar = () => {


    return (

        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">Stream Editor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="https://github.com/sky-uk/sds-dvn-files-streams">Github Repo</Nav.Link>
            <NavDropdown title="Branches" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Stub Master</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Stub 1.1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Stub 1.2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
        
    )
};
