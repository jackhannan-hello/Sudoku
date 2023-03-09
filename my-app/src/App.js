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


{/*class BigSquare extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  numberSelection = ""
  
  placeNumber(i){
    const squares = this.state.squares.slice();
    squares[i] = this.numberSelection;
    this.setState({squares: squares});
  }


  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.placeNumber(i)}
      />
    );
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
}*/}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    }
  }
  
  numberSelection = ""

  selectNum(i) {
    BigSquare.numberSelection = i
  }

  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.placeNumber(i)}
      />
    );
  }

  renderBigSquare(i) {
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

  renderNum(i) {
    return (
      <Num 
        value={i}
        onClick={() => this.selectNum(i)}
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
            {this.renderBigSquare(0)}{this.renderBigSquare(1)}{this.renderBigSquare(2)}
          </div>
          <div className='board-row'>  
            {this.renderBigSquare(3)}{this.renderBigSquare(4)}{this.renderBigSquare(5)}
          </div>
          <div className='board-row'>  
            {this.renderBigSquare(6)}{this.renderBigSquare(7)}{this.renderBigSquare(8)}
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
