const defaultState = {
    profile: {},
}

const tempUserReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_TEMP_USER":
            return {
                profile: {...action.payload},
            }
        case "CLEAR_TEMP_USER":
            localStorage.clear()
            return {
                profile: {}
            }
        default: return state
    }
}

export default tempUserReducer