import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { storeNames } from '../reducers/tempUserActions'
import { createTherapist } from '../reducers/therapistActions'
import { createClient } from '../reducers/clientActions'

// Edit Profile component
const EditUserType = ({ match }) => {
  // SET and GET Therapist/Client state
  const [isTherapist, setIsTherapist] = useState(true)
  const [preferredName, setPreferredName] = useState('')
  const [lastName, setLastName] = useState('')
  const [short_summary, setShortSummary] = useState('')
  const [languages, setLanguages] = useState([])
  const { id } = useParams()
  const history = useHistory();
  const dispatch = useDispatch()
  

  const tempObj = useSelector(state => state.tempUserReducer.profile)
  const store = useSelector(state => state)


  const tempUserObj = {
    profile: {
      first_name: preferredName,
      last_name: lastName,
      short_summary: short_summary,
      languages: languages,
      user_id: parseInt(id)
    }
  }

  useEffect(() => {
    console.log(tempObj)
    // redirectTherapistProfile()
    console.log(store)
  })

  const storeProfileInfo = e => {
    e.preventDefault()
    dispatch(storeNames(tempUserObj))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(tempObj.store)
    therapistOrClient()
  }

  const therapistOrClient = () => {
    if (isTherapist) {
      console.log("Therapist is true")
      dispatch(createTherapist(tempObj.profile))
      history.push(`/therapists/${id}`)
    } else {
      console.log("Therapist is false")
      dispatch(createClient(tempObj.profile))
      history.push(`/therapists`)
    }
  }

  // GET user type value from onChange event handlder
  // SET isTherapist
  const getUserTypeValue = e => {
    const user_type = e.target.value
    if (
      user_type === 'Therapist' ? setIsTherapist(true) : setIsTherapist(false)
    );
  }

  return (
    <div className=''>
      <div>
        <section className='jumbotron jumbotron-fluid text-center'>
          <div className='container py-5'>
            <h1 className='display-4'>Create your profile</h1>
            <p className='lead text-muted'>
              Login to make an appoint book with these professional therapists
              who are available now.
            </p>
          </div>
        </section>
        <section className='jumbotron jumbotron-fluid'>
          <div className='container py-8'>
            <form onSubmit={handleSubmit} onChange={storeProfileInfo}>
              <div className='form-group'>
                <label htmlFor='therapist_first_name'>Preferred name</label>
                <input
                  type='text'
                  className='form-control'
                  id='therapist_first_name'
                  aria-describedby='therapist_first_name'
                  placeholder='James'
                  onChange={e => setPreferredName(e.target.value)}
                  value={preferredName}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='therapist_last_name'>Last name</label>
                <input
                  type='text'
                  className='form-control'
                  id='therapist_last_name'
                  placeholder='Manning'
                  onChange={e => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <br />
              <div className='form-group' onChange={getUserTypeValue}>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='user-type'
                    id='isATherapist'
                    value='Therapist'
                    defaultChecked
                  />
                  <label className='form-check-label' htmlFor='isATherapist'>
                    I'm here to help
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='user-type'
                    id='isAClient'
                    value='Client'
                  />
                  <label className='form-check-label' htmlFor='isAClient'>
                    I'm looking for help
                  </label>
                </div>
              </div>
              <br />
              <div>
                {' '}
                {isTherapist ? (
                  <div className=''>
                    <div className='form-group'>
                      <label htmlFor='therapist_last_name'>
                        Tell us about yourself?
                      </label>
                      <textarea
                        type='text'
                        className='form-control'
                        id='therapist_last_name'
                        placeholder='Counsellor specialising in Anxiety, Relationship Issues and Trauma and PTSD'
                        rows='3'
                        onChange={e => setShortSummary(e.target.value)}
                        value={short_summary}
                      />
                    </div>
                  </div>
                ) : (
                  'No worries, were here to help you get in touch with someone right for you'
                )}{' '}
              </div>
              <br />
              <button type='submit' className='btn btn-primary'>
                Create Profile
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default EditUserType
