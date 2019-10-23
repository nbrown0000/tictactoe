import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: ['','','','','','','','',''],
      player1: {}, // uses crosses (X)
      computer: {} // uses noughts (O)
    }
  }

  cellClicked(event) {
    console.log(event)
    this.setState({grid: this.state.grid.map((item,i) => {
      if(event===i) item='X'
      return item
    })})
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
        </div>
      </div>
    );
  }
}

export default App;
