import React from 'react';
import './styles/App.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import StreamDetails from './containers/stream-details';
import { NavBar } from './components/nav-bar';
import './styles/index.css';

class App extends React.Component {
  state = {
    directories: [],
    streamData: [],
    branches: [],
    selectedStream: null,
    selectedDirectory: null,
    selectedBranch: null
  }

  // export function fetchStatusHandler(response) {
  //   if (response.status === 200) {
  //     return response;
  //   }
  //   return response.json().then(result => Promise.reject(result));
  // }

  componentDidMount() {
    fetch(`http://localhost:8000/github/get-branches`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      // .then(fetchStatusHandler)
      .then(result => (result.json()))
      .then(result => this.setState({ branches: result }))
      .catch(error => console.log(error));
  };

  selectBranch = (key) => {
    this.setState({ selectedBranch: key})

    console.log(key)
    fetch(`http://localhost:8000/github/get-directories/?branch=${key}`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      // .then(fetchStatusHandler)
      .then(result => result.json())
      .then(result => this.setState({ directories: result }))
      .catch(error => console.log(error));
  }

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
            <div>
              <p className="currently-showing">Current Selected Branch: {this.state.selectedBranch}</p>
              <p className="currently-showing">Now viewing: {this.state.selectedDirectory}/{this.state.selectedStream}</p>
            </div>
            <DropdownButton id="dropdown-basic-button" className="push" title="Select Branches">
              {
                this.state.branches.map(
                  (data, index) => (<Dropdown.Item key={`${index}-button`} onClick={() => this.selectBranch(data)}>{data}</Dropdown.Item>)
                )
              }
            </DropdownButton>
            {this.state.selectedBranch &&
              <DropdownButton id="dropdown-basic-button" className="directory-selector dropdown-menu-align-responsive-2" title="Select Directory">
                {
                  this.state.directories && this.state.directories.map(
                    (data, index) => (<Dropdown.Item key={`${index}-button`} onClick={() => this.selectDirectory(data)}>{data}</Dropdown.Item>)
                  )
                }
              </DropdownButton>
            }
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
        {this.state.selectedStream && <StreamDetails selectedStream={this.state.selectedStream} selectedDirectory={this.state.selectedDirectory} selectedBranch={this.state.selectedBranch}/>}
      </div>
    );
  }
}

export default App;


