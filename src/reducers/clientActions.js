import { url } from "../environment"

const setClient = (payload) => ({ type: "SET_CLIENT", payload });

export const createClient = (userInfo) => (dispatch) => {

  const token = localStorage.getItem("token");

  console.log("accessing createClient correctly");

  fetch(`${url}clients`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: userInfo,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dispatch(setClient(data.data));
      localStorage.setItem("client_id", data.data.id)
    })
    .catch(error => console.log(error));
};