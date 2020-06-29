const initialState = {
    number: 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT': {
            state.number += 1;
            return { ...state }
            break;
        }
        case 'DECREMENT': {
            state.number -= 1;
            return { ...state }
            break;
        }
        default: return state;
    }
}

export default counterReducer;