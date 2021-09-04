import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector  } from 'react-redux';

import './game.css';

import { clearGameHistory, addNewGameStep, addGameWinner, addNextStep, addCurrentStepNumber, addFinish } from '../../redux/actions/gameActions';
import Board from '../Board/Board';

export const Context =  createContext();

function Game() {

    const dispatch = useDispatch();
    const gameState = useSelector(state => state.gameReducer);
    // const { history, winCombination, nextStep, currentStepNumber, isFinish } = gameState;
    const { history,  nextStep,  isFinish, currentStepNumber } = gameState;

    // const [history, setHi] = useState([{ squares: Array(9).fill('') }]);
    // const [currentStepNumber, setCurrentStepNumber] = useState(0);
    // const [nextStep, setNextStep] = useState('X');
    // const [isFinish, setIsFinish] = useState(false);
    // const [winCombination, setWinCombination] = useState([]);

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
        // setWinCombination(lines[i]);
        dispatch(addGameWinner(lines[i]));
        return true;
      }
    }
    return false;
  }

  const clickSquare = (i) => {
    const currentSquaresCopy = [...history[history.length - 1].squares];
    let isFinishLocal;
    if (currentSquaresCopy[i] === '' && !isFinish) {
      currentSquaresCopy[i] = nextStep;
      isFinishLocal = calculateWinner(currentSquaresCopy);
      // setHi(history.concat({ squares: currentSquaresCopy }));
      dispatch(addNewGameStep({squares: currentSquaresCopy}));
      // setNextStep(isFinish ? nextStep : nextStep === 'X' ? '0' : 'X');
      dispatch(addNextStep(isFinish ? nextStep : nextStep === 'X' ? '0' : 'X'));
      
      // setCurrentStepNumber(history.length);
      dispatch(addCurrentStepNumber(history.length));
      // setIsFinish(isFinishLocal);
      dispatch(addFinish(isFinishLocal));
    }
  }

  const finishButton = () => {
    if (isFinish === true) {
      return (
        <button className='finish-button' onClick={() => resetGame()}>
          Обновить игру
        </button>
      );
    }
  }

  const resetGame = () => {
      // setHi([{ squares: Array(9).fill('') }]);
      dispatch(clearGameHistory());
      // setNextStep('X');
      dispatch(addNextStep('X'));
      // setCurrentStepNumber(0);
      dispatch(addCurrentStepNumber(0));
      // setIsFinish(false);
      dispatch(addFinish(false));
      // setWinCombination([]);
  }

  const jumpTo = step => {
    // setCurrentStepNumber(step);
    dispatch(addCurrentStepNumber(step));
  }

  const showButtonsHistory = () => {
    return history.map((step, index) => {
      if (index > 0) {
        return (
          <li key={index}>
            <button 
            className= {index === currentStepNumber
              ? 'active'
              : 'inactive'} 
            onClick={() => jumpTo(index)}>
              Перейти на ход {index + 1}
            </button>
          </li>
        );
      }
      return console.log('bla');
    });
  }

  // const showButtonsHistory = () => {
	// 	return history.map((item, index) => {
	// 		if (index > 0) {
	// 			return (
	// 				<li key={index}>
	// 					<button
	// 						className={
	// 							index === currentStepNumber
	// 								? "btn-active"
	// 								: "btn-non-active"
	// 						}
	// 						onClick={() => jumpTo(index)}
	// 					>
	// 						Перейти на ход {index}
	// 					</button>
	// 				</li>
	// 			);
	// 		}
	// 	});
	// }
    let status;

    if (isFinish) {
      status = 'Игра закончилась. Выйграли ' + nextStep;
    } else {
      status = 'Следующий ход за: ' + nextStep;
    }


    const contextValues = { clickSquare };

    return (
      <Context.Provider value = { contextValues }>
        <div className='game'>
        <div className='status'>{status}</div>
          <div className='game-board'>
            
            <Board
              // currentStepNumber = {currentStepNumber}
              // winCombination={winCombination}
              // squares={currentSquares}
              // history={history}
              // nextStep={nextStep}
              // isFinish={isFinish}
            />
            <div className='game-info'>
              <div>{/* status */}</div>
              <ul>
                <li>{showButtonsHistory()}</li>
              </ul>
              <div>{finishButton()}</div>
            </div>
          </div>
        </div>
      </Context.Provider>
    );
}

Game.propTypes = {
  name: PropTypes.string
};

export default Game;


