import React, { useState } from "react";
import "./TicTacToe.css";

function Square(props: { value: String; onClick: () => void }) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props: {
  squares: Array<String>;
  onClick: (i: number) => void;
}) {
  function renderSquare(i: number): React.ReactNode {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
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

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [stepCnt, setStepCnt] = useState(0);

  function getNext(): String {
    return stepCnt % 2 === 0 ? "X" : "O";
  }

  function handleClick(i: number): void {
    if (
      calculateWinner(squares) !== "" ||
      squares[i] !== "" ||
      stepCnt === 9
    ) {
      return;
    }
    const ns = squares.slice();
    ns[i] = getNext();
    setSquares(ns);
    setStepCnt(stepCnt + 1);
  }


  const winner = calculateWinner(squares);
  let status: String = ""
  if (winner === "") {
    if (stepCnt === 9) {
      status = "Draw!";
    } else {
      status = "Next player: " + getNext();
    }
  } else {
    status = "Winner: " + winner + " !";
  }

  return (
    <div className="game">
      <h2>{status}</h2>
      <div className="game-board">
        <Board squares={squares} onClick={i => handleClick(i)} />
      </div>
        <button className="button-reset"
          onClick={() =>
            {
              setSquares(Array(9).fill(""));
              setStepCnt(0);
            }
          }
        >
          Reset
        </button>
    </div>
  );
}

function calculateWinner(squares: Array<String>): String {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return "";
}

export { Square, Board, Game };
