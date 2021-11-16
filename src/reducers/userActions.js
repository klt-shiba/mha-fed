// Action Creators
const setUser = payload => ({ type: 'SET_USER', payload })
const setUserType = payload => ({ type: 'SET_USER_TYPE', payload })

export const logUserOut = () => (
  {
    type: 'LOG_OUT'
  }
)

// Methods

export const fetchUser = userInfo => dispatch => {
  console.log('accessing fetchUser correctly')

  fetch(`http://127.0.0.1:3001/api/v1/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
    .then(res => res.json())
    .then(data => {
      // data sent back will in the format of
      // {
      //     user: {},
      //.    token: "aaaaa.bbbbb.bbbbb"
      // }
      console.log(data)
      localStorage.setItem('token', data.jwt)
      dispatch(setUser(data.user))
    })
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
      return false
    })
}

export const autoLogin = () => dispatch => {

  console.log('accessing autoLogin correctly')

  fetch(`http://127.0.0.1:3001/api/v1/auto-auth`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      localStorage.setItem('token', data.jwt)
      dispatch(setUser(data.user))
    })
    .catch((error) => console.log(error))
}

// export const createUserRole = ({ boolean, userInfo}) => (dispatch) => {
//   console.log("Accessed")
//   const url = () => {
//     if (boolean) {
//       "http://127.0.0.1:3000/api/v1/therapists"
//     } else {
//       "http://127.0.0.1:3000/api/v1/clients"
//     }
//   }

//   const token = localStorage.getItem("token");
//   console.log(token)

//   console.log("accessing createUserRole correctly");

//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//       "Authorization": `Bearer ${token}`,
//     },
//     body: JSON.stringify(userInfo),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       // data sent back will in the format of
//       // {
//       //     user: {},
//       //.    token: "aaaaa.bbbbb.bbbbb"
//       // }
//       console.log(data);
//       dispatch(setUserType(data));
//     });
// };

