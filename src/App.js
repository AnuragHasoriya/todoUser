import React, { Component } from 'react';
import './App.css';
import Todo from './component/todo';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todo></Todo>
      </div>
    );
  }
  
}

export default connect()(App);