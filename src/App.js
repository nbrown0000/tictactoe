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
    this.state.grid.forEach((item,i) => {if(item==='') moves.push(i)})
    return moves;
  }

  //computers turn algorithm
  computersMove = () => {
    sleep(500).then(()=>{
      // play random move
      const moves = this.possibleMoves();
      const randomMoveLocation = moves[Math.floor(Math.random()*moves.length)]
      this.setState({grid: this.state.grid.map((item,i) => {
        if(randomMoveLocation===i) item='O';
        return item;
      })})
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
