const defaultState = {
    loggedIn: false,
    user: {},
    hasError: false,
    error: {},
    type: {}
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                loggedIn: true,
                hasError: false,
                error: {},
                user: { ...action.payload }
            }
        case "SET_USER_ERROR":
            return {
                ...state,
                loggedIn: false,
                hasError: true,
                error: { ...action.payload }
            }
        case "SET_USER_TYPE":
            return {
                type: { ...action.payload }
            }
        case "LOG_OUT":
            console.log("logging-out")
            localStorage.clear()
            return {
                loggedIn: false,
                user: {}
            }
        default: return state
    }
}

export default userReducer