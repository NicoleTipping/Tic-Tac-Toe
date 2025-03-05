import React, { useState } from 'react';
import Square from './Square';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (calculateWinner(squares) || squares[index]) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  const renderSquare = (index) => (
    <Square 
      value={squares[index]} 
      onClick={() => handleClick(index)}
      isWinningSquare={winningLine?.includes(index)}
      />
  );

  const { winner, winningLine } = calculateWinner(squares) || {};
  const status = winner? `Winner: ${winner}`: `Next player: ${isXNext ? 'X' : 'O'}`;

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
      <div className='reset-button'>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let winningLine of winningLines) {
    const [a, b, c] = winningLine;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine };
    }
  }
  return null;
};


export default Board;