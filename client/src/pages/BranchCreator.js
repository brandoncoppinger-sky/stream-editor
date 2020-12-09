import React from 'react'
import { Form, Button } from 'react-bootstrap'

class BranchCreator extends React.Component {

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

export default BranchCreator;