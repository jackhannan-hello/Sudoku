import './App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// This code is cotnributed by phasing17
// JS program to implement the approach
class Sudoku {
 
  // Constructor
  constructor(N, K) {
      this.N = N;
      this.K = K;

      // Compute square root of N
      const SRNd = Math.sqrt(N);
      this.SRN = Math.floor(SRNd);

      // Initialize all entries as false to indicate
      // that there are no edges initially
      this.mat = Array.from({
          length: N
      }, () => Array.from({
          length: N
      }, () => 0));
  }

  // Sudoku Generator
  fillValues() {
      // Fill the diagonal of SRN x SRN matrices
      this.fillDiagonal();

      // Fill remaining blocks
      this.fillRemaining(0, this.SRN);

      // Remove Randomly K digits to make game
      //this.removeKDigits();
  }

  // Fill the diagonal SRN number of SRN x SRN matrices
  fillDiagonal() {
      for (let i = 0; i < this.N; i += this.SRN) {
          // for diagonal box, start coordinates->i==j
          this.fillBox(i, i);
      }
  }

  // Returns false if given 3 x 3 block contains num.
  unUsedInBox(rowStart, colStart, num) {
      for (let i = 0; i < this.SRN; i++) {
          for (let j = 0; j < this.SRN; j++) {
              if (this.mat[rowStart + i][colStart + j] === num) {
                  return false;
              }
          }
      }
      return true;
  }

  // Fill a 3 x 3 matrix.
  fillBox(row, col) {
      let num = 0;
      for (let i = 0; i < this.SRN; i++) {
          for (let j = 0; j < this.SRN; j++) {
              while (true) {
                  num = this.randomGenerator(this.N);
                  if (this.unUsedInBox(row, col, num)) {
                      break;
                  }
              }
              this.mat[row + i][col + j] = num;
          }
      }
  }

  // Random generator
  randomGenerator(num) {
      return Math.floor(Math.random() * num + 1);
  }

  // Check if safe to put in cell
  checkIfSafe(i, j, num) {
      return (
          this.unUsedInRow(i, num) &&
          this.unUsedInCol(j, num) &&
          this.unUsedInBox(i - (i % this.SRN), j - (j % this.SRN), num)
      );
  }

  // check in the row for existence
  unUsedInRow(i, num) {
      for (let j = 0; j < this.N; j++) {
          if (this.mat[i][j] === num) {
              return false;
          }
      }
      return true;
  }

  // check in the row for existence
  unUsedInCol(j, num) {
      for (let i = 0; i < this.N; i++) {
          if (this.mat[i][j] === num) {
              return false;
          }
      }
      return true;
  }

  // A recursive function to fill remaining
  // matrix
  fillRemaining(i, j) {
      // Check if we have reached the end of the matrix
      if (i === this.N - 1 && j === this.N) {
          return true;
      }

      // Move to the next row if we have reached the end of the current row
      if (j === this.N) {
          i += 1;
          j = 0;
      }


      // Skip cells that are already filled
      if (this.mat[i][j] !== 0) {
          return this.fillRemaining(i, j + 1);
      }

      // Try filling the current cell with a valid value
      for (let num = 1; num <= this.N; num++) {
          if (this.checkIfSafe(i, j, num)) {
              this.mat[i][j] = num;
              if (this.fillRemaining(i, j + 1)) {
                  return true;
              }
              this.mat[i][j] = 0;
          }
      }

      // No valid value was found, so backtrack
      return false;
  }

  // Print sudoku
  printSudoku() {
      for (let i = 0; i < this.N; i++) {
              console.log(this.mat[i].join(" "))
      }
  }

  // Remove the K no. of digits to
  // complete game
  removeKDigits() {
      let count = this.K;

      while (count !== 0) {
          // extract coordinates i and j
          let i = Math.floor(Math.random() * this.N);
          let j = Math.floor(Math.random() * this.N);
          if (this.mat[i][j] !== 0) {
              count--;
              this.mat[i][j] = 0;
          }
      }

      return;
  }
}

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
      squares: Array(9).fill(0).map(row => new Array(9).fill(null)),
      /* 00|01|02||10|11|12||20|21|22|
         03|04|05||13|14|15||23|24|25|
         06|07|08||16|17|18||26|27|28|
         -----------------------------
         30|31|32||40|41|42||50|51|52|
         33|34|35||43|44|45||53|54|55|
         36|37|38||46|47|48||56|57|58|
         -----------------------------
         60|61|62||70|71|72||80|81|82|
         63|64|65||73|74|75||83|84|85|
         66|67|68||76|77|78||86|87|88|
      */
      solution: Array(9).fill(0).map(row => new Array(9).fill(0)),

      solutionRows: Array(9).fill(0).map(row => new Array(9).fill(0)),
      /*row0 00,01,02,10,11,12,20,21,22
        row1 03,04,05,13,14,15,23,24,25
        row2 06,07,08,16,17,18,26,27,28
        row3 30,31,32,40,41,42,50,51,52
        row4 33,34,35,43,44,45,53,54,55
        row5 36,37,38,46,47,48,56,57,58
        row6 60,61,62,70,71,72,80,81,82
        row7 63,64,65,73,74,75,83,84,85
        row8 66,67,68,76,77,78,86,87,88*/
      solutionCollums: Array(9).fill(0).map(row => new Array(9).fill(0))
      /*coll0 00,03,06,30,33,36,60,63,66
        coll1 01,04,07,31,34,37,61,64,67
        coll2 02,05,08,32,35,38,62,65,68
        coll3 10,13,16,40,43,46,70,73,76
        coll4 11,14,17,41,44,47,71,74,77
        coll5 12,15,18,42,45,48,72,75,78
        coll6 20,23,26,50,53,56,80,83,86
        coll7 21,24,27,51,54,57,81,84,87
        coll8 22,25,28,52,55,58,82,85,88*/
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
      <div className='bigSquare'>
        <div className="sqaure-row">
          {this.renderSquare(0, i)}
          {this.renderSquare(1, i)}
          {this.renderSquare(2, i)}
        </div>
        <div className="square-row">
          {this.renderSquare(3, i)}
          {this.renderSquare(4, i)}
          {this.renderSquare(5, i)}
        </div>
        <div className="square-row">
          {this.renderSquare(6, i)}
          {this.renderSquare(7, i)}
          {this.renderSquare(8, i)}
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

  fillSolutionRows(num, i, j){
    const solutionRows = this.state.solutionRows.slice();
    if (i < 3){
      if (j < 3){
        solutionRows[0][(i * 3) + j] = num;
      }
      else if (j < 6){
        solutionRows[1][(i * 3) + (j- 3)] = num;
      }
      else{
        solutionRows[2][(i * 3) + (j - 6)] = num;
      }
    }
    else if(i < 6){
      if (j < 3){
        solutionRows[3][(i - 3) * 3 + j] = num;
      }
      else if (j < 6){
        solutionRows[4][(i - 3) * 3 + (j- 3)] = num;
      }
      else{
        solutionRows[5][(i - 3) * 3 + (j - 6)] = num;
      }
    }
    else{
      if (j < 3){
        solutionRows[6][(i - 6) * 3 + j] = num;
      }
      else if (j < 6){
        solutionRows[7][(i - 6) * 3 + (j- 3)] = num;
      }
      else{
        solutionRows[8][(i - 6) * 3 + (j - 6)] = num;
      }
    }
    this.setState({solutionRows: solutionRows});
  }

  fillSolutionCollums(num, i, j){
    const solutionCollums = this.state.solutionCollums.slice();
    if (i % 3 === 0){
      if (j % 3 === 0){
        solutionCollums[0][i + Math.floor(j / 3)] = num;
      }
      else if (j % 3 === 1){
        solutionCollums[1][i + Math.floor(j / 3)] = num;
      }
      else{
        solutionCollums[2][i + Math.floor(j / 3)] = num;
      }
    }
    else if (i % 3 === 1){
      if (j % 3 === 0){
        solutionCollums[3][(i - 1) + Math.floor(j / 3)] = num;
      }
      else if (j % 3 === 1){
        solutionCollums[4][(i - 1) + Math.floor(j / 3)] = num;
      }
      else{
        solutionCollums[5][(i - 1) + Math.floor(j / 3)] = num;
      }
    }
    else{
      if (j % 3 === 0){
        solutionCollums[6][(i-2) + Math.floor(j / 3)] = num;
      }
      else if (j % 3 === 1){
        solutionCollums[7][(i-2) + Math.floor(j / 3)] = num;
      }
      else{
        solutionCollums[8][(i-2) + Math.floor(j / 3)] = num;
      }
    }
    this.setState({solutionCollums: solutionCollums});
  }

  checkRows(num, i, j){
    let k = i;
    let m = j;
    const solution = this.state.solution.slice();
    for (k; k < (i + 3); k++){
      for(m; m < (j + 3); m++){
        if(solution[i][j] === num){
          return false;
        }
      }
    }
    return true;
  }

  checkCollums(num, i, j){
    const solutionCollums = this.state.solutionCollums.slice();
    if (i % 3 === 0){
      if (j % 3 === 0){
        return solutionCollums[0].includes(num);
      }
      else if (j % 3 === 1){
        return solutionCollums[1].includes(num);
      }
      else{
        return solutionCollums[2].includes(num);
      }
    }
    else if (i % 3 === 1){
      if (j % 3 === 0){
        return solutionCollums[3].includes(num);
      }
      else if (j % 3 === 1){
        return solutionCollums[4].includes(num);
      }
      else{
        return solutionCollums[5].includes(num);
      }
    }
    else{
      if (j % 3 === 0){
        return solutionCollums[6].includes(num);
      }
      else if (j % 3 === 1){
        return solutionCollums[7].includes(num);
      }
      else{
        return solutionCollums[8].includes(num);
      }
    }
  }

  isNumSafe(num, i, j){
    return(
      !this.state.solution[i].includes(num) //&&
      //!this.checkCollums(num, i, j)// &&
      //!this.checkRows(num, i, j)
    );
  }

  fillRestBigSquares(){
    const solution = this.state.solution.slice();
    for (let i = 1; i < 8; i++){
      for (let j =0; j < 9; j++){
        let num = Math.floor(Math.random() * 9) + 1;
        while(solution[i][j] === 0){
          if (this.isNumSafe(num, i, j)){
            solution[i][j] = num;
            this.setState({solution: solution});
            this.fillSolutionRows(num, i, j);
            this.fillSolutionCollums(num, i, j)
          }
          else{
            if (num === 9){num = 1}
            else{num++}
          }
        }
      }
    }
  }

  fillBigSquares048(){
    const solution = this.state.solution.slice();
    for (let i = 0; i < 9; i += 4){
      for (let j = 0; j < 9; j++){
        let num = 0;
        while(solution[i][j] === 0){
          num = Math.floor(Math.random() * 9) + 1;
          if (!solution[i].includes(num)){
            solution[i][j] = num;
            this.setState({solution: solution});
            this.fillSolutionRows(num, i, j);
            this.fillSolutionCollums(num, i, j);
          }
          else{num = 0;}
        }  
      }
    }
  }

  createSolution(){
    //this.fillBigSquares048();
    //this.fillRestBigSquares();
    let K = 40
    let sudoku = new Sudoku(9, K)
    sudoku.fillValues()
    console.log(sudoku)
    const solution = this.state.solution.slice();
    const squares = this.state.squares.slice();
    
    for(let i = 0; i < 9; i++){
      for (let j = 0; j < 9; j++)
      solution[i][j] = sudoku.mat[i][j];
    }

    sudoku.removeKDigits()
    for(let i = 0; i < 9; i++){
      for (let j = 0; j < 9; j++)
      if (sudoku.mat[i][j] === 0){
        squares[i][j] = null;
      } else{squares[i][j] = sudoku.mat[i][j];}
    }

    this.setState({squares: squares})
    console.log(this.state.solution);
    //console.log(this.state.solutionRows);
    //console.log(this.state.solutionCollums);
  }

  startEasyGame(){
    this.createSolution()
  }

  startMediumGame(){}

  startHardGame(){}

  render() {
    return (
      <div>
        <div className="header">
          <Typography variant="h2" color="black">SUDOKU</Typography>
          <Stack direction={'row'} spacing={2}>   
            <Button variant="contained" onClick={() => this.startEasyGame()}>Easy</Button>
            <Button variant="contained" onClick={() => this.startMediumGame()}>Medium</Button>
            <Button variant="contained" onClick={() => this.startHardGame()}>Hard</Button>
          </Stack>
        </div>
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
