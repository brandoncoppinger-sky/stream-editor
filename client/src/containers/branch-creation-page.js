import React from 'react'
import { Form } from 'react-bootstrap'

import { SpinnerPage } from "../components/spinner"
import { Toastie } from "../components/toaster"
import '../styles/stream-details.css';
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/mode-yaml";

class BranchCreation extends React.Component {

    state = {
        isLoading: true,
        showToastie: true
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control placeholder="Branch Name" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )
    }
};

export default BranchCreation;