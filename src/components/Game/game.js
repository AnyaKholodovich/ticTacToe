import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./game.css";
import Board from "../Board/Board";

function Game() {
    const [history, setHi] = useState([{ squares: Array(9).fill("") }]);
    const [currentStepNumber, setCurrentStepNumber] = useState(0);
    const [nextStep, setNextStep] = useState("X");
    const [isFinish, setIsFinish] = useState(false);

    const calculateWinner = squares => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return true;
      }
    }
    return false;
  }

  const clickSquare = (i) => {
    const currentSquaresCopy = [...history[history.length - 1].squares];
    let isFinishLocal;
    if (currentSquaresCopy[i] === "" && !isFinish) {
      currentSquaresCopy[i] = nextStep;
      isFinishLocal = calculateWinner(currentSquaresCopy);
      setHi(history.concat({ squares: currentSquaresCopy }));
      setNextStep(isFinish ? nextStep : nextStep === "X" ? "0" : "X");
      setCurrentStepNumber(history.length);
      setIsFinish(isFinishLocal);
    }
  }

  const finishButton = () => {
    if (isFinish === true) {
      return (
        <button className="finish-button" onClick={() => resetGame()}>
          Обновить игру
        </button>
      );
    }
  }

  const resetGame = () => {
      setHi([{ squares: Array(9).fill("") }]);
      setNextStep("X");
      setCurrentStepNumber(0);
      setIsFinish(false);
  }

  const jumpTo = step => {
    setCurrentStepNumber(step);
  }

  const showButtonsHistory = () => {
    return history.map((step, index) => {
      if (index > 0) {
        return (
          <li key={index}>
            <button 
            className="btn-list" 
            onClick={() => jumpTo(index)}>
              Перейти на ход {index + 1}
            </button>
          </li>
        );
      }
      return console.log('bla');
    });
  }
    let status;

    if (isFinish) {
      status = "Игра закончилась. Выйграли " + nextStep;
    } else {
      status = "Следующий ход за: " + nextStep;
    }

    const currentSquares = history[currentStepNumber].squares;

    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board
            squares={currentSquares}
            history={history}
            nextStep={nextStep}
            isFinish={isFinish}
            handleClickSquare={clickSquare}
          />
          <div className="game-info">
            <div>{/* status */}</div>
            <ul>
              <li>{showButtonsHistory()}</li>
            </ul>
            <div>{finishButton()}</div>
          </div>
        </div>
      </div>
    );
}

Game.propTypes = {
  name: PropTypes.string
};

export default Game;


