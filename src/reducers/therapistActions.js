import { url } from "../environment"

const setTherapist = (payload) => ({ type: "SET_THERAPIST", payload });
const setTherapistIssues = (payload) => ({ type: "SET_THERAPIST_ISSUES", payload });
const setTherapistTreatment = (payload) => ({ type: "SET_THERAPIST_TREATMENT", payload });
const setTherapistUpdateError = (payload) => ({ type: "SET_THERAPIST_UPDATE_ERROR", payload });
const updateTherapist = (payload) => ({ type: "UPDATE_THERAPIST", payload });



export const clearTherapist = () => ({ type: "LOG_OUT" });



export const createTherapist = (userInfo) => (dispatch) => {
  console.log("accessing setTherapist correctly");

  const token = localStorage.getItem("token");
  fetch(`${url}therapists`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: userInfo,
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(setTherapist(data.data))
      console.log(data);
      return true
    })
    .catch(error => console.log(error));
};


export const postIssues = (issues, id) => (dispatch) => {

  console.log("accessing postIssues correctly");

  const url = `${url}therapists/${id}/add-issues`

  const token = localStorage.getItem("token");
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(issues)
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

export const postTreatments = (treatments, id) => (dispatch) => {

  console.log("accessing postTreatments correctly");

  const url = `${url}therapists/${id}/add-treatments`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(treatments)
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


export const updateTherapistUser = (userID, userInfo) => async dispatch => {

  const response = await fetch(`${url}therapists/${userID}/update`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: userInfo
  })
  if (!response.ok) {
    dispatch(setTherapistUpdateError(response))
  }
  const data = await response.json()
  console.log(data)
  dispatch(updateTherapist(data))
}
