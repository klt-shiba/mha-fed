import { url } from "../environment"

// Action Creators
const setUser = payload => ({ type: 'SET_USER', payload })
const setUserError = payload => ({ type: 'SET_USER_ERROR', payload })



export const logUserOut = () => (
  {
    type: 'LOG_OUT'
  }
)

// Methods

export const fetchUser = userInfo => async dispatch => {

  const response = await fetch(`${url}auth`, {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
  if (!response.ok) {
    localStorage.removeItem('token')
    dispatch(setUserError(response))
    return false
  }
  const data = await response.json()
  dispatch(setUser(data.user.data))
  localStorage.setItem('token', data.jwt)
}

//   // Function to POST Register details details
export const signUserUp = userInfo => async dispatch => {

  const response = await fetch(`${url}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
  if (!response.ok) {
    localStorage.removeItem('token')
    dispatch(setUserError(response))
    return false
  }
  const data = await response.json()
  console.log(data)
  dispatch(setUser(data.user.data))
  localStorage.setItem('token', data.jwt)
}

export const autoLogin = () => async dispatch => {


  const response = await fetch(`${url}auto-auth`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (!response.ok) {
    dispatch(setUserError(response))
    localStorage.removeItem('token')
  }
  const data = await response.json()
  dispatch(setUser(data?.user?.data))
}
