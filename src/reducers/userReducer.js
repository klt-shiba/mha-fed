const defaultState = {
    loggedIn: false,
    user: {},
    hasError: false,
    error: {},
    setupComplete: false,
    setupStepNumber: ""
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
        case "SET_USER_SETUP_PROGRESS":
            return {
                ...state,
                setupComplete: false,
                setupStepNumber: Number(action.payload)
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