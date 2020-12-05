import React from 'react';
import './App.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import StreamDetails from './components/stream-details';
import { NavBar } from './components/nav-bar';
import './index.css';

class App extends React.Component {
  state = {
    directories: [],
    streamData: [],
    selectedStream: null,
    selectedDirectory: null
  }

  // export function fetchStatusHandler(response) {
  //   if (response.status === 200) {
  //     return response;
  //   }
  //   return response.json().then(result => Promise.reject(result));
  // }

  componentDidMount() {
    fetch(`http://localhost:8000/github/get-directories`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      // .then(fetchStatusHandler)
      .then(result => result.json())
      .then(result => this.setState({ directories: result }))
      .catch(error => console.log(error));
  };
  
  selectDirectory = (key) => {
    this.setState({ selectedDirectory: key });

    fetch(`http://localhost:8000/github/get-stream-files/?path=${key}`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      // .then(fetchStatusHandler)
      .then(result => result.json())
      .then(result => this.setState({ streamData: result }))
      .catch(error => console.log(error));
  }

  selectStream = (key) => {
    this.setState({ selectedStream: key })
  }

  render() {
    return (
      <div>
        <NavBar />
        <center>
        
        <div className="dropdown-collection">
          <h2>Stream Details</h2>
          <p>Now viewing: {this.state.selectedDirectory}/{this.state.selectedStream}</p>
          <DropdownButton id="dropdown-basic-button" className="push" title="Select Directory">
            {
              this.state.directories && this.state.directories.map(
                (data, index) => (<Dropdown.Item key={`${index}-button`} onClick={() => this.selectDirectory(data)}>{data}</Dropdown.Item>)
              )
            }
          </DropdownButton>
          {this.state.selectedDirectory &&
            <DropdownButton id="dropdown-basic-button" className="stream-selector" title="Select Stream">
              {
                this.state.streamData.map(
                  (data, index) => (<Dropdown.Item key={`${index}-button`} onClick={() => this.selectStream(data.path)}>{data.path}</Dropdown.Item>)
                )
              }
            </DropdownButton>
            }
        </div>
        </center>
        {/* This is a conditional - if selected stream exists render this component */}
        {this.state.selectedStream && <StreamDetails selectedStream={this.state.selectedStream} selectedDirectory={this.state.selectedDirectory}/>}
      </div>
    );
  }
}

export default App;


