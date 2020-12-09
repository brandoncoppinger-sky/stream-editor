import React from 'react'
import { Button } from 'react-bootstrap'
import AceEditor from "react-ace";
import { SpinnerPage } from "../components/spinner"
import { Toastie } from "../components/toaster"
import '../styles/stream-details.css';
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/mode-yaml";

class StreamDetails extends React.Component {

  state = {
    stream: ``,
    initialStream: ``,
    editedStream: {},
    hasChanged: false,
    isEditedStreamEmpty: true,
    isLoading: true,
    shouldShowToast: false,
    message: ""
  }

  componentDidMount() {
    fetch(`http://localhost:8000/github/get-stream-files-content/?path=${this.props.selectedDirectory}/${this.props.selectedStream}&branch=${this.props.selectedBranch}`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      // .then(fetchStatusHandler)
      .then(result => (result.text()))
      .then(result => this.setState({ initialStream: result,  stream: result, isLoading: false}))
      .catch(error => this.setState({ message: error }));

  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedStream !== this.props.selectedStream || prevProps.selectedDirectory !== this.props.selectedDirectory || prevProps.selectedBranch !== this.props.selectedBranch) {
      //RESET THE STATE
      fetch(`http://localhost:8000/github/get-stream-files-content/?path=${this.props.selectedDirectory}/${this.props.selectedStream}&branch=${this.props.selectedBranch}`, {
        method: 'GET',
        credentials: 'same-origin',
      })
        // .then(fetchStatusHandler)
        .then(result => (result.text()))
        .then(result => this.setState({ stream: result, message: `Now viewing ${this.props.selectedDirectory}/${this.props.selectedStream}`, shouldShowToast: true, isLoading: false}))
        .catch(error => this.setState({ message: error, shouldShowToast: true }));

    }
  }

  onChange = (newValue) => {
    if (this.state.stream !== newValue) {
      this.setState({ hasChanged: true })
      this.setState({ stream: newValue })
    }
  }

  onSave = () => {
    const pathName = `${this.props.selectedDirectory}/${this.props.selectedStream}`
    if (this.state.stream !== this.state.initialStream) {
      this.setState({
        editedStream: {
          ...this.state.editedStream,
          [pathName]: this.state.stream
        },
        isEditedStreamEmpty: false,
        message: `Added stream ${pathName}`,
        shouldShowToast: true 
      })
      console.log("changed state")
    } else {
      console.log("cannot save same content")
    }

    if (!this.state.editedStream) {
      this.setState({
        isEditedStreamEmpty: true
      })
    }
  }

  onPush = () => {
    fetch(`http://localhost:8000/github/test-commit/?branch=${this.props.selectedBranch}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.editedStream)
    })
    .then(response => this.setState({ message: `Added changes to branch ${this.props.selectedBranch} (${response.status})`, shouldShowToast: true })
    )
    .then(error => this.setState({ message: error, shouldShowToast: true }))

  }

  toggleToast = () => {
    this.setState({shouldShowToast : false})
    this.setState({message: ""})
  }
  render() {
    return (
      <div>
        { this.state.isLoading ? <SpinnerPage /> :
          <div>
            <AceEditor
              mode="yaml"
              theme="cobalt"
              onChange={this.onChange}
              name="stream_editor"
              className="stream-editor"
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showPrintMargin: false
              }}
              value={this.state.stream}
              
            />
            <div className="stream-editor-buttons">
              <Button type="submit" onClick={this.onSave} disabled={!this.state.hasChanged}>Save</Button>
              <Button type="submit" style={{ float: "right" }} variant="danger" onClick={this.onPush} disabled={this.state.isEditedStreamEmpty}>Push To Branch</Button>
            </div>
          </div>
        }
          <Toastie toggleToast={this.toggleToast} shouldShowToast={this.state.shouldShowToast} message={this.state.message} />
      </div>

    )
  }
};

export default StreamDetails;