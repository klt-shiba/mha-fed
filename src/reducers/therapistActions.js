const setTherapist = (payload) => ({ type: "SET_THERAPIST", payload });
const setTherapistIssues = (payload) => ({ type: "SET_THERAPIST_ISSUES", payload });
const setTherapistTreatment = (payload) => ({ type: "SET_THERAPIST_TREATMENT", payload });

export const clearTherapist = () => ({ type: "LOG_OUT" });



export const createTherapist = (userInfo) => (dispatch) => {
  console.log("accessing setTherapist correctly");

  const token = localStorage.getItem("token");
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
      dispatch(setTherapist(data.data))
      return true
    })
    .catch(error => console.log(error));
};


export const postIssues = (userInfo, id) => (dispatch) => {

  console.log("accessing postIssues correctly");

  const url = `https://damp-journey-90616.herokuapp.com/api/v1/therapists/${id}/add-issues`

  const token = localStorage.getItem("token");
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userInfo)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // Sets Therapist Object again
      dispatch(setTherapistIssues(data.data.attributes.issues))
      return true
    })
    .catch(error => {
      console.log(error)
      return false
    })
}

export const postTreatments = (userInfo, id) => (dispatch) => {

  console.log("accessing postTreatments correctly");

  const url = `https://damp-journey-90616.herokuapp.com/api/v1/therapists/${id}/add-treatments`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(userInfo)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      dispatch(setTherapistTreatment(data.data.attributes.treatments))
      console.log("working")
      return true
    })
    .catch(error => {
      console.log(error)
      return false
    })
}