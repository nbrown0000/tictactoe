import React from 'react';
import './App.css';

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
  
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
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

  cornerMovesAvailable() {
    // if cell 1,3,7,9 available return true
    if(this.possibleMoves().some(r => [0,2,6,8].includes(r))) return true
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

  positionsTakenBy(symbol) {
    var result = [];
    this.state.grid.forEach((item,i) => {
      if(item===symbol) result.push(i)
    })
    return result;
  }



  columnToDefend() {
    const { playerSymbol, computerSymbol } = this.state;
    if(this.intersection(this.positionsTakenBy(playerSymbol),[0,3,6]).length===2) {
      if(this.intersection(this.positionsTakenBy(computerSymbol),[0,3,6]).length===0) {
        return 1
      }
    }
    else if(this.intersection(this.positionsTakenBy(playerSymbol),[1,4,7]).length===2) {
      if(this.intersection(this.positionsTakenBy(computerSymbol),[1,4,7]).length===0) {
        return 2
      }
    }
    else if(this.intersection(this.positionsTakenBy(playerSymbol),[2,5,8]).length===2) {
      if(this.intersection(this.positionsTakenBy(computerSymbol),[2,5,8]).length===0) {
        return 3
      }
    }
    else return 0
  }

  rowToDefend() {
    const { playerSymbol, computerSymbol } = this.state;
    if(this.intersection(this.positionsTakenBy(playerSymbol),[0,1,2]).length===2) {
      if(this.intersection(this.positionsTakenBy(computerSymbol),[0,1,2]).length===0) {
        return 1
      }
    }
    if(this.intersection(this.positionsTakenBy(playerSymbol),[3,4,5]).length===2) {
      if(this.intersection(this.positionsTakenBy(computerSymbol),[3,4,5]).length===0) {
        return 2
      }
    }
    if(this.intersection(this.positionsTakenBy(playerSymbol),[6,7,8]).length===2) {
      if(this.intersection(this.positionsTakenBy(computerSymbol),[6,7,8]).length===0) {
        return 3
      }
    }
  }

  leftDiagToDefend() {
    const { playerSymbol, computerSymbol } = this.state;
    if(this.intersection(this.positionsTakenBy(playerSymbol),[0,4,8]).length===2) {
      if(this.intersection(this.positionsTakenBy(computerSymbol),[0,4,8]).length===0) {
        return true
      }
    }
    else return false
  }

  rightDiagToDefend() {
    const { playerSymbol, computerSymbol } = this.state;
    if(this.intersection(this.positionsTakenBy(playerSymbol),[2,4,6]).length===2) {
      if(this.intersection(this.positionsTakenBy(computerSymbol),[2,4,6]).length===0) {
        return true
      }
    }
    else return false
  }

  playMove(position, symbol) {
    this.setState({grid: this.state.grid.map((item,i) => {
      if(i===position) item=symbol;
      return item
    })})

    const { grid, playerSymbol, computerSymbol } = this.state;
    if(grid[0]===playerSymbol && grid[4]===playerSymbol && grid[8]===playerSymbol) {
      this.setState({gameOver: true})
    }

    
  }

  //computers turn algorithm
  computersMove = () => {
    const { computerSymbol, grid } = this.state

    // sleep(300).then(()=>{

      // Computers First Move
      if(this.possibleMoves().length===8) {
        const availGoodMoves = this.intersection(this.possibleMoves(),[0,2,6,8]);
        const chosenGoodMove = availGoodMoves[Math.floor(Math.random()*availGoodMoves.length)]
        this.playMove(chosenGoodMove,computerSymbol)
        this.setState({turn: 'player'})
      }

      // defend columns
      else if(this.columnToDefend()) {
        console.log('Defend a column')
        switch(this.columnToDefend()) {
          case 1:
            // defend column 1
            if(grid[0]==='') this.playMove(0,computerSymbol)
            else if(grid[3]==='') this.playMove(3,computerSymbol)
            else if(grid[6]==='') this.playMove(6,computerSymbol)
            this.setState({turn: 'player'})
            break;
          case 2:
            // defend column 2
            if(grid[1]==='') this.playMove(1,computerSymbol)
            else if(grid[4]==='') this.playMove(4,computerSymbol)
            else if(grid[7]==='') this.playMove(7,computerSymbol)
            this.setState({turn: 'player'})
            break;
          case 3:
            // defend column 3
            if(grid[2]==='') this.playMove(2,computerSymbol)
            else if(grid[5]==='') this.playMove(5,computerSymbol)
            else if(grid[8]==='') this.playMove(8,computerSymbol)
            this.setState({turn: 'player'})
            break;
          default: break;
        }
      }

      // defend rows
      else if(this.rowToDefend()) {
        switch(this.rowToDefend()) {
          case 1:
            // defend row 1
            if(grid[0]==='') this.playMove(0,computerSymbol)
            else if(grid[1]==='') this.playMove(1,computerSymbol)
            else if(grid[2]==='') this.playMove(2,computerSymbol)
            this.setState({turn: 'player'})
            break;
          case 2:
            // defend row 2
            if(grid[3]==='') this.playMove(3,computerSymbol)
            else if(grid[4]==='') this.playMove(4,computerSymbol)
            else if(grid[5]==='') this.playMove(5,computerSymbol)
            this.setState({turn: 'player'})
            break;
          case 3:
            // defend row 3
            if(grid[6]==='') this.playMove(6,computerSymbol)
            else if(grid[7]==='') this.playMove(7,computerSymbol)
            else if(grid[8]==='') this.playMove(8,computerSymbol)
            this.setState({turn: 'player'})
            break;
          default: break;
        }
      }

      else if(this.leftDiagToDefend()) {
        console.log("Defend left diagonal!")
        if(grid[0]==='') this.playMove(0,computerSymbol)
        else if(grid[4]==='') this.playMove(4,computerSymbol)
        else if(grid[8]==='') this.playMove(8,computerSymbol)
        this.setState({turn: 'player'})
      }

      else if(this.rightDiagToDefend()) {
        console.log("Defend right diagonal!")
        if(grid[2]==='') this.playMove(2,computerSymbol)
        else if(grid[4]==='') this.playMove(4,computerSymbol)
        else if(grid[6]==='') this.playMove(6,computerSymbol)
        this.setState({turn: 'player'})
      }
      
      // random move
      else {
        const moves = this.possibleMoves()
        const chosenMove = moves[Math.floor(Math.random()*moves.length)]
        this.playMove(chosenMove, computerSymbol)
        this.setState({turn: 'player'})
      }

      
    // }) // end sleep

    //console.log(this.positionsTaken(this.state.playerSymbol));
    // this.sleep(300).then(() => {
    //   console.log(this.positionsTaken(this.state.playerSymbol).concat(this.positionsTaken(computerSymbol)))
    // })
    

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
          {this.state.gameOver ? <p>GAME OVER!</p>: <p></p> }
        </div>
      </div>
    );
  }
}

export default Game;
