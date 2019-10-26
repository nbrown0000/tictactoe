import React from 'react';
import './App.css';

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameOver: false,
      grid: ['','','','','','','','',''],
      playerSymbol: 'X',
      computerSymbol: 'O',
      turn: 'player'
    }
  }

  componentDidUpdate() {
    if(this.state.turn === 'computer') this.computersMove();
  }

  cellClicked(event) {
    this.setState({grid: this.state.grid.map((item,i) => {
      if(event===i) {
        if(this.state.grid[i]==='') { item='X'; this.setState({turn: 'computer'})}
        if(this.state.grid[i]==='X') { item='X'; this.setState({turn: 'player'})}
        if(this.state.grid[i]==='O') { item='O'; this.setState({turn: 'player'})}
      }
      return item;
    })})
  }

  possibleMoves() {
    var moves = [];
    this.state.grid.forEach((item,i) => {if(item==='') moves.push(i+1)})
    return moves;
  }

  cornerMovesAvailable() {
    // if cell 1,3,7,9 available return true
    if(this.possibleMoves().some(r => [1,3,7,9].includes(r))) return true
    // else return false
    else return false
  }

  intersection(arr1, arr2) {
    var result = [];
    arr1.forEach(item => {
      if(arr2.includes(item)) result.push(item)
    })
    return result;
  }

  positionsTaken(symbol) {
    var result = [];
    this.state.grid.forEach((item,i) => {
      if(item===symbol) result.push(i+1)
    })
    return result;
  }

  columnToDefend() {
    if(this.intersection(this.positionsTaken(this.state.playerSymbol),[1,4,7]).length===2) return 1
    if(this.intersection(this.positionsTaken(this.state.playerSymbol),[2,5,8]).length===2) return 2
    if(this.intersection(this.positionsTaken(this.state.playerSymbol),[3,6,9]).length===2) return 3
  }

  //computers turn algorithm
  computersMove = () => {
    const { playerSymbol, computerSymbol, grid } = this.state

    sleep(300).then(()=>{
      // // play random move
      // const moves = this.possibleMoves();
      // const randomMoveLocation = moves[Math.floor(Math.random()*moves.length)]
      // this.setState({grid: this.state.grid.map((item,i) => {
      //   if(randomMoveLocation===i) item='O';
      //   return item;
      // })})

      if(this.possibleMoves().length===8) {
        const availGoodMoves = this.intersection(this.possibleMoves(),[1,3,7,9]);
        const chosenGoodMove = availGoodMoves[Math.floor(Math.random()*availGoodMoves.length)]
        this.setState({grid: grid.map((item,i) => {
          if(chosenGoodMove===i+1) item=computerSymbol;
          return item;
        })})
      }

      switch(this.columnToDefend()) {
        case 1:
          console.log('column 1');
          // play move with spot
          break;
        case 2:
          console.log('column 2');
          // play move with spot
          break;
        case 3:
          console.log('column 3');
          // play move with spot
          break;
        default: break;

      }

    })

    console.log('computer played a move');
    this.setState({turn: 'player'})
  }

  render() {

    return (
      <div className="App">
        <div className='header'>
          <h1>Tic Tac Toe</h1>
        </div>
        
        <div className='grid'>
          {this.state.grid.map((item,i) => {
            return (
              <div
                key={i}
                className='cell'
                onClick={() => this.cellClicked(i)}
              >
                {item}
              </div>
            )
          })}
        </div>

        <div className='footer'>
          <p>Designed and built by Nathan Brown</p>
          <p>{this.state.turn}'s turn...</p>
          <p>{`Is game over? ${this.state.gameOver}`}</p>
        </div>
      </div>
    );
  }
}

export default Game;
