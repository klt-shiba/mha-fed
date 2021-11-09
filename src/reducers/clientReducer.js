const defaultState = {
    isClient: {}
}

const clientReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_CLIENT":
            return {
                isClient: {...action.payload}
            }
        default: return state
    }
}

export default clientReducer