const initialState = {
    history: [{ squares: Array(9).fill('') }],
    winCombination: [],
    nextStep: 'X',
    currentStepNumber: (0),
    isFinish: false
}

export const gameReducer = (state = initialState, action) => {
    const { payload } = action;
    const { history } = state;

    switch(action.type){
        case 'ADD_NEW_STEP':
            return {...state, history: history.concat(payload)};
        break;

        case 'CLEAR_GAME_HISTORY':
            return {...initialState};
        break;

        case 'ADD_GAME_WINNER':
            return {...state, winCombination: payload};
        break;

        case 'ADD_NEXT_STEP':
            return {...state, nextStep: payload};
        break;

        case 'ADD_CURRENT_STEP':
            return {...state, currentStepNumber: payload};
        break;

        case 'ADD_FINISH_GAME':
            return {...state, isFinish: payload};
        break;

        default:
            return {...state};
    }
}