import React from "react";
import ReactDOM from "react-dom";
// import { render } from "react-dom";
import { useState } from "react/cjs/react.development";
import './index.css';


function Square(props){
    return (
        <button 
        className="square"
        onClick={props.onClick}>
        {props.value}
        </button>
    )
}

// class Square extends React.Component {
//     render() {
//       return (
//         <button 
//         className="square"
//         onClick={()=>this.props.onClick()}
//         >
//         {this.props.value}
//         </button>
//       );
//     }
//   }


function Board(props){

    function renderSquare(i){
        return(
        <Square
        key = {i}
        value = {props.squares[i]}
        onClick = {()=>props.onClick(i)}
        />);
    }
    

    return (
        
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
    );



}



//   class Board extends React.Component {
//       constructor(props){
//         super(props);
//         this.state = {
//             squares: Array(9).fill(null)
//         }
//     }


//     handleClick(i){
//         const squares = this.state.squares.slice();
//         squares[i] = 'X';
//         this.setState({squares:squares});
//     }



//     renderSquare(i) {
//       return (<Square 
//       value={this.state.squares[i]}
//       onClick = {()=> this.handleClick(i)} 

//       />
//       );
//     }
  
//     render() {
//       const status = 'Next player: X';
  
//       return (
//         <div>
//           <div className="status">{status}</div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }


function Game(){
    const [history,setHistory] = useState([{squares:Array(9).fill(null)}]);
    const [xIsNext,setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const current = history[stepNumber]; //current is always the last item in history. (i.e. the lastest)
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move)=> {
        const description = move? 'Go To Move #' + move : 'Go To Game Start';

        return <li key={move}>
        <button
        onClick={()=>jumpTo(move)}
        >
        {description}
        </button>
        </li>
    })

    let status = '';
    if (winner === 'draw') {
      status = 'draw';
    } else if (!winner){
      status = xIsNext ? 'Next Player: X' : 'Next Player: O';


        
    } else{
      status = 'Player ' + winner + ' Won!';
    }

    function jumpTo(step){
      setXIsNext(step%2===0);
      setStepNumber(step);

    }
    function handleClick(i){
        const temp = history.slice(0, stepNumber+1);
        const current = temp[temp.length-1];
        if (!current.squares[i] && !winner){
            const newSquares = current.squares.slice(); // copy the current squares array to a new array.
            newSquares[i] = xIsNext? 'X' : 'O';
            const newHistory = temp.concat([{squares:newSquares}])
            setHistory(newHistory);
            setStepNumber(temp.length);
            setXIsNext(!xIsNext);
        }
    }


    return(
        <div className="game">
          <div className="game-board">
            <Board 
            squares = {current.squares}
            onClick = {(i)=>handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
    )
}

//   class Game extends React.Component {
//     render() {
//       return (
//         <div className="game">
//           <div className="game-board">
//             <Board />
//           </div>
//           <div className="game-info">
//             <div>{/* status */}</div>
//             <ol>{/* TODO */}</ol>
//           </div>
//         </div>
//       );
//     }
//   }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let count = 0;
    squares.forEach(element=>{
      if (element !== null) {
        count+= 1;
      }
    })
    if (count === 9){
      return 'draw';
    }
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }