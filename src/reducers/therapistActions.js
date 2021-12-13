const setTherapist = (payload) => ({ type: "SET_THERAPIST", payload });

export const clearTherapist = () => ({ type: "LOG_OUT" });

export const createTherapist = (userInfo) => (dispatch) => {
  const token = localStorage.getItem("token");
  console.log(token)
  console.log("accessing setTherapist correctly");

  fetch(`https://damp-journey-90616.herokuapp.com/api/v1/therapists`, {
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
      dispatch(setTherapist(data))
      localStorage.setItem("therapist_id", data.data.id);
    });
};





