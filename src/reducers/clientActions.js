const setClient = (payload) => ({ type: "SET_CLIENT", payload });


export const createClient = (userInfo) => (dispatch) => {

  const token = localStorage.getItem("token");

  console.log("accessing createClient correctly");

  fetch(`http://127.0.0.1:3001/api/v1/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      // data sent back will in the format of
      // {
      //     user: {},
      //.    token: "aaaaa.bbbbb.bbbbb"
      // }
      console.log(data);
      dispatch(setClient(data));
    });
};