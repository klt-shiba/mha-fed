const setTempUser = (payload) => ({ type: "SET_TEMP_USER", payload})

export const clearTempUser = () => ({type: "CLEAR_TEMP_USER"})

export const storeNames = (userInfo) => dispatch => {
    console.log("accessing storeNames correctly")
    dispatch(setTempUser(userInfo))
}
