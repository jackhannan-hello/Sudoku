import './App.css';
import React from 'react';

function Num(props) {
  return (
    <button className="num" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(0).map(row => new Array(9).fill(null))
    }
  }
  
  numberSelection = ""

  selectNum(k) {
    this.numberSelection = k
  }

  renderSquare(j, i) {
    return (
      <Square
        value={this.state.squares[i][j]}
        onClick={() => this.placeNumber(j, i)}
      />
    );
  }

  placeNumber(j, i){
    const squares = this.state.squares.slice();
    squares[i][j] = this.numberSelection;
    this.setState({squares: squares});
  }

  createBigSquare(i){
    return (  
      <div className='bigSquare' value={this.state.squares[i]}>
        <div className="sqaure-row">
          <div className='square0'>{this.renderSquare(0, i)}</div>
          <div className='square1'>{this.renderSquare(1, i)}</div>
          <div className='square2'>{this.renderSquare(2, i)}</div>
        </div>
        <div className="square-row">
          <div className='square3'>{this.renderSquare(3, i)}</div>
          <div className='square4'>{this.renderSquare(4, i)}</div>
          <div className='square5'>{this.renderSquare(5, i)}</div>
        </div>
        <div className="square-row">
          <div className='square6'>{this.renderSquare(6, i)}</div>
          <div className='square7'>{this.renderSquare(7, i)}</div>
          <div className='square8'>{this.renderSquare(8, i)}</div>
        </div>
      </div>
    )
  }

  renderNum(k) {
    return (
      <Num 
        value={k}
        onClick={() => this.selectNum(k)}
      />
    );
  }

  render() {
    const status = 'SUDOKU';

    return (
      <div>
        <div className="status">{status}</div>
        <div className='board'>
          <div className='board-row'>  
            {this.createBigSquare(0)}{this.createBigSquare(1)}{this.createBigSquare(2)}
          </div>
          <div className='board-row'>  
            {this.createBigSquare(3)}{this.createBigSquare(4)}{this.createBigSquare(5)}
          </div>
          <div className='board-row'>  
            {this.createBigSquare(6)}{this.createBigSquare(7)}{this.createBigSquare(8)}
          </div>
        </div>
        <div className='nums'>
          {this.renderNum(1)}{this.renderNum(2)}{this.renderNum(3)}{this.renderNum(4)}{this.renderNum(5)}{this.renderNum(6)}{this.renderNum(7)}{this.renderNum(8)}{this.renderNum(9)}
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

export default Game;
