const defaultState = {
    isClient: false,
    client: {}

}

const clientReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_CLIENT":
            return {
                isClient: true,
                client: { ...action.payload }
            }
        default: return state
    }
}

export default clientReducer