
export const addNewGameStep = data => {
    return {
        type: 'ADD_NEW_STEP',
        payload: data
    }
}

export const clearGameHistory = () => {
    return {
        type: 'CLEAR_GAME_HISTORY'
    }
}

export const addGameWinner = data =>{
    return{
        type: 'ADD_GAME_WINNER',
        payload: data
    }
}

export const addNextStep = data => {
    return{
        type: 'ADD_NEXT_STEP',
        payload: data
    }
}

export const addCurrentStepNumber = data => {
    return {
      type: 'ADD_CURRENT_STEP',
      payload: data
    }
}

export const addFinish = data => {
    return {
      type: 'ADD_FINISH_GAME',
      payload: data
    }
  }

