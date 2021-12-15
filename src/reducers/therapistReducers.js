const defaultState = {
    isTherapist: false,
    therapist: {},
    hasIssues: false,
    issues: [],
    hasTreatment: false,
    treatment: []
}

const therapistReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_THERAPIST":
            return {
                ...state,
                isTherapist: true,
                therapist: { ...action.payload }
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
        default: return state
    }
}

export default therapistReducer