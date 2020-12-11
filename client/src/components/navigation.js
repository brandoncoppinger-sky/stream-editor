import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

export const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/">Stream Editor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="https://github.com/sky-uk/sds-dvn-files-streams" target="_blank">Github Repo</Nav.Link>
                    {/* <Nav.Link as={Link} to="create-new-branch">Create a Branch</Nav.Link> */}
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search (WIP)" className="mr-sm-2" />
                    <Button variant="outline-success" disabled={true}>Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
};
