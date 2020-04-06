const initialState = {
    todos: [],
    users :[]
}

export function userStore(state = initialState, action) {
    switch (action.type) {
        case 'USER_ACTION':
            return {
                ...state,
                users: action.payload
            }
        case 'SET_ALL_TODO_ACTION':
            return {
                ...state, 
                todos: action.payload
            }
            
        default:
            return state
    }
}