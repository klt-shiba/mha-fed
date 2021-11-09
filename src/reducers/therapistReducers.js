const defaultState = {
    isTherapist: {}
}

const therapistReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_THERAPIST":
            return {
                isTherapist: {...action.payload}
            }
        default: return state
    }
}

export default therapistReducer