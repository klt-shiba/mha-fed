const defaultState = {
    id: "",
    isTherapist: false,
    therapist: {},
    hasIssues: false,
    issues: [],
    hasTreatment: false,
    treatment: [],
    hasError: false,
    error: {}
}

const therapistReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_THERAPIST":
            return {
                ...state,
                isTherapist: true,
                therapist: { ...action.payload.attributes },
                id: parseInt(action.payload.id)
            }
        case "SET_THERAPIST_ISSUES":
            return {
                ...state,
                hasIssues: true,
                issues: [...action.payload]
            }
        case "SET_THERAPIST_TREATMENT":
            console.log("working")
            return {
                ...state,
                hasTreatment: true,
                treatment: [...action.payload]
            }
        case "SET_THERAPIST_UPDATE_ERROR":
            console.log("working")
            return {
                ...state,
                hasError: true,
                error: { ...action.payload }
            }
        case "UPDATE_THERAPIST":
            return {
                ...state,
                isTherapist: true,
                therapist: { ...action.payload.attributes },
                id: parseInt(action.payload.id)
            }
        default: return state
    }
}

export default therapistReducer