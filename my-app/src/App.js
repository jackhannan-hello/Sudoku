import './App.css';
import React from 'react';

class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: null}
  }
  
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}


class BigSquare extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    }
  }
  
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    return (  
      <div>
        <div className='bigSquare'>
          <div className="sqaure-row">
            <div className='square0'>{this.renderSquare(0)}</div>
            <div className='square1'>{this.renderSquare(1)}</div>
            <div className='square2'>{this.renderSquare(2)}</div>
          </div>
          <div className="square-row">
            <div className='square3'>{this.renderSquare(3)}</div>
            <div className='square4'>{this.renderSquare(4)}</div>
            <div className='square5'>{this.renderSquare(5)}</div>
          </div>
          <div className="square-row">
            <div className='square6'>{this.renderSquare(6)}</div>
            <div className='square7'>{this.renderSquare(7)}</div>
            <div className='square8'>{this.renderSquare(8)}</div>
          </div>
        </div>
      </div>
    )
  }
}

class Board extends React.Component {
  renderBigSquare(i) {
    return <BigSquare value={i}/>;
  }

  render() {
    const status = 'SUDOKU';

    return (
      <div>
        <div className="status">{status}</div>
        <div className='board'>
          <div className='board-row'>  
            {this.renderBigSquare(0)}{this.renderBigSquare(1)}{this.renderBigSquare(2)}
          </div>
          <div className='board-row'>  
            {this.renderBigSquare(3)}{this.renderBigSquare(4)}{this.renderBigSquare(5)}
          </div>
          <div className='board-row'>  
            {this.renderBigSquare(6)}{this.renderBigSquare(7)}{this.renderBigSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default Game;
