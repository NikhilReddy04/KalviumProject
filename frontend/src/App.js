import React, { Component } from 'react';
import './App.css'; // Import the CSS file

const languages = [
  'C',
  'CPP',
  'PYTHON',
  'JAVA',
  'NODEJS',
  'RUBY',
  'PROMPTV1',
  'PROMPTV2',
  'MULTIFILE',
  'SQLITE3',
  'RUST',
  'SWIFT',
  'TYPESCRIPT'
];

class App extends Component {
  state = {
    languageSelected: '',
    code: '',
    output: '' 
  };

  handleChange = (event) => {
    this.setState({ code: event.target.value });
  };

  handleLanguageChange = (event) => {
    this.setState({ languageSelected: event.target.value });
  };

  executeCode = async () => {
    const { languageSelected, code } = this.state;

    try {
      const response = await fetch('http://localhost:3000/api/execute/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: languageSelected,
          script: code
        })
      });
      const result = await response.json();
      if (result.error === 0) {
        this.output = result.output;
      } else {
        this.output = `Error: ${result.compile_message}`;
      }
    } catch (error) {
      this.output = `Error: ${error.message}`;
    }
  };

  render() {
    return (
      <div className="app-container">
        <h2>Code Executor</h2>
        <div className="code-input">
          <textarea
            rows="10"
            cols="50"
            value={this.state.code}
            onChange={this.handleChange}
            placeholder="Enter your code here"
          />
        </div>
        <div className="code-controls">
          <select value={this.state.languageSelected} onChange={this.handleLanguageChange}>
            {languages.map((language) => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
          <button className="execute-button" onClick={this.executeCode}>Execute</button>
        </div>
        <div className="code-output">
          <h3>Output:</h3>
          <pre>{this.state.output}</pre>
        </div>
      </div>
    );
  }
}

export default App;
