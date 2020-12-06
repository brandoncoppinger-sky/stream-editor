import React from 'react'
import { Formik } from 'formik'
import { Button, OverlayTrigger, ButtonToolbar, Tooltip, Form } from 'react-bootstrap'

class StreamDetails extends React.Component {

  state = {
    stream: {}
  }

  componentDidMount() {
    fetch(`http://localhost:8000/github/get-stream-files-content/?path=${this.props.selectedDirectory}/${this.props.selectedStream}`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      // .then(fetchStatusHandler)
      .then(result => result.json())
      .then(result => this.setState({ stream: result }))
      .catch(error => console.log(error));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e)
  }

  onReset(e) {
    e.preventDefault();
  }

  render() {
    const keys = Object.keys(this.state.stream).map((keys) => (keys))
    return (
      <Formik>
        <form className="stream-form" onSubmit={this.handleSubmit} onReset={this.handleReset}>
          {keys.map((key, index) => {
            return (
              <div className="form-group" key={index}>
                <Form.Group>

                <label key={`${index}-label`}>{key}</label>
                {
                  <div>
                    {typeof this.state.stream[key] == 'object' && console.log(this.state.stream[key])}
                    <Form.Control id="stream-inputs" key={`${index}-input`} defaultValue={this.state.stream[key]} />
                    <ButtonToolbar id="stream-tooltip">
                      {['right'].map(placement => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <strong>Please enter the correct details for {key}</strong>.
                          </Tooltip>
                          }
                        >
                          <Button variant="success" className="ml-1">i</Button>
                        </OverlayTrigger>
                      ))}
                    </ButtonToolbar>
                  </div>
                }
                </Form.Group>
              </div>
            )
          })}
          <Button as="input" type="submit" value="Save" />
        </form>
      </Formik>

    )
  }
};

export default StreamDetails;