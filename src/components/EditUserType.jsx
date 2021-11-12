import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { storeNames } from '../reducers/tempUserActions'
import { createTherapist } from '../reducers/therapistActions'
import { createClient } from '../reducers/clientActions'
import { TextInputField, Textarea, Pane, Button, RadioGroup, Heading, Text, majorScale, Label } from "evergreen-ui";


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

  const [options] = useState([
    { label: 'Im a Therapist', value: 'Therapist' },
    { label: 'Im a client', value: 'Client' }
  ])

  const [value, setValue] = useState('restricted')


  return (
    <Pane
      display="flex"
      flexDirection="column"
      className="vbox">
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginY={majorScale(4)}>

        <Pane
          max-width="480px"
          display="block"
          textAlign="center">
          <Pane>
            <Heading
              size={900}
              is="h1"
              textAlign="center"
              marginY={majorScale(1)}>Create your profile</Heading>
            <Text
              size={600}
              textAlign="center">
              Login to make an appoint book with these professional therapists
              who are available now.
            </Text>
          </Pane>
          <Pane
            display="block"
            alignItems="center"
            justifyContent="center"
            textAlign="left"
            marginY={majorScale(3)}
          >
            <form onSubmit={handleSubmit} onChange={storeProfileInfo}>
              <TextInputField
                type='text'
                className='form-control'
                label="Preferred name"
                id='therapist_first_name'
                aria-describedby='therapist_first_name'
                placeholder='James'
                onChange={e => setPreferredName(e.target.value)}
                value={preferredName}
              />
              <TextInputField
                type='text'
                label="Last name"
                className='form-control'
                id='therapist_last_name'
                placeholder='Manning'
                onChange={e => setLastName(e.target.value)}
                value={lastName}
              />

              <Pane className='form-group'>
                <RadioGroup
                  label="What are you here for?"
                  size={16}
                  value={value}
                  options={options}
                  onChange={event => setValue(event.target.value)}
                />
              </Pane>
              <br />
              <Pane>
                {' '}
                {isTherapist ? (
                  <div className=''>
                    <div className='form-group'>
                      <Label htmlFor="therapist_about_myself" marginBottom={4} display="block">
                        Tell us about yourself
                      </Label>
                      <Textarea
                        type='text'
                        className='form-control'
                        id='therapist_about_myself'
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
              </Pane>
              <br />
              <Button type='submit' className='btn btn-primary'>
                Create Profile
              </Button>
            </form>
          </Pane>
        </Pane>
      </Pane>
    </Pane >
  )
}

export default EditUserType
