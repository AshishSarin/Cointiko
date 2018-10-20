const INITIAL_STATE = {
    demo: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_DEMO':
            return { ...state, demo: 'Test' };
        default:
            return state;
    }
}