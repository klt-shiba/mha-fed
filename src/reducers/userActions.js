// Action Creators
const setUser = payload => ({ type: 'SET_USER', payload })
const setUserType = payload => ({ type: 'SET_USER_TYPE', payload })

export const logUserOut = () => (
  {
    type: 'LOG_OUT'
  }
)

// Methods

export const fetchUser = userInfo => async dispatch => {

  console.log('accessing fetchUser correctly')

  const response = await fetch(`http://127.0.0.1:3001/api/v1/auth`, {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    localStorage.removeItem('token')
    console.log(message)
    return false
  }
  const data = await response.json()
  console.log(data)
  localStorage.setItem('token', data.jwt)
  dispatch(setUser(data.user))
}

//   // Function to POST Register details details

export const signUserUp = userInfo => dispatch => {
  console.log('accessing userAction correctly')

  fetch(`http://127.0.0.1:3001/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if (data.error) {
        return false
      }
      // data sent back will in the format of
      // {
      //     user: {},
      //.    token: "aaaaa.bbbbb.bbbbb"
      // }
      localStorage.setItem('token', data.jwt)
      dispatch(setUser(data.user))
    })
    .catch(error => {
      console.log(error)
      localStorage.removeItem('token')
      return false
    })
}

export const autoLogin = () => async dispatch => {

  console.log('accessing autoLogin correctly')

  const response = await fetch(`http://127.0.0.1:3001/api/v1/auto-auth`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    localStorage.removeItem('token')
    console.log(message)
  }
  const data = await response.json()
  console.log(data)
  dispatch(setUser(data.user))
}
