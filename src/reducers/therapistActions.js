const setTherapist = (payload) => ({ type: "SET_THERAPIST", payload });

export const clearTherapist = () => ({ type: "LOG_OUT" });

export const createTherapist = (userInfo) => (dispatch) => {
  const token = localStorage.getItem("token");
  console.log(token)
  console.log("accessing setTherapist correctly");

  fetch(`http://127.0.0.1:3001/api/v1/therapists`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: userInfo,
  })
    .then((res) => res.json())
    .then((data) => {
      // data sent back will in the format of
      // {
      //     user: {},
      //.    token: "aaaaa.bbbbb.bbbbb"
      // }
      console.log(data);
      dispatch(setTherapist(data))
      localStorage.setItem("therapist_id", data.data.id);
    });
};




