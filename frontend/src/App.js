import React, { Component } from 'react';
import './App.css';

const languages = [
  { name: 'C', value: 'c' },
  { name: 'CPP', value: 'cpp' },
  { name: 'PYTHON', value: 'python' },
  { name: 'JAVA', value: 'java' },
  { name: 'NODEJS', value: 'nodejs' },
  { name: 'RUBY', value: 'ruby' },
  { name: 'PROMPTV1', value: 'promptv1' },
  { name: 'PROMPTV2', value: 'promptv2' },
  { name: 'MULTIFILE', value: 'multifile' },
  { name: 'SQLITE3', value: 'sqlite3' },
  { name: 'RUST', value: 'rust' },
  { name: 'SWIFT', value: 'swift' },
  { name: 'TYPESCRIPT', value: 'typescript' }
];



class App extends Component {
  state = {
    languageSelected: 'nodejs',
    code: '',
    output: '',
    statusCode: '',
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
        this.setState({ output: result.output ,statusCode:result.status_code});
      } else {
        this.setState({ output: `Error: ${result.compile_message}` });
      }
    } catch (error) {
      this.setState({ output: `Error: ${error.message}` });
    }
  };

  render() {
    const{code,languageSelected}=this.state
    console.log(languageSelected)
    return (
      <div className="app-container">
        <h2>Code Executor</h2>
        <div className="main-container">
          <div className="input-container">
            <h3>Input:</h3>
            <div className="code-input">
              <textarea
                rows="10"
                value={code}
                onChange={this.handleChange}
                placeholder="Enter your code here"
              />
            </div>
          </div>
          <div className="output-container">
            <div className="code-controls">
              <select class="select-option" value={this.state.languageSelected} onChange={this.handleLanguageChange}>
                {languages.map((language) => (
                  <option key={language.value} value={language.value}>{language.name}</option>
                ))}
              </select>
              <button className="execute-button" onClick={this.executeCode}>Execute</button>
            </div>
            <h3>Output:</h3>
            <pre>{this.state.output}</pre>
          </div>
        
        </div>
      </div>
    );
  }
}

export default App;
