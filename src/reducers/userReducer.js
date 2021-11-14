const defaultState = {
    loggedIn: false,
    user: {},
    type: {}
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                loggedIn: true,
                user: { ...action.payload }
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