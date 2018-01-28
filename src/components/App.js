import React, { Component } from 'react';
import logo from '../assets/fidget.svg';
import Timer from './Timer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" title="What is Pomodoro?" rel="noopener noreferrer" target="_blank">
		  	<h1 className="App-title">Pomodoro Timer</h1>
			</a>
        </header>

		<div className="App-body">
			<Timer/>
		</div>
      </div>
    );
  }
}

export default App;
