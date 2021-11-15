import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { storeNames } from '../reducers/tempUserActions'
import { createTherapist } from '../reducers/therapistActions'
import { createClient } from '../reducers/clientActions'
import { TextInputField, Textarea, Pane, Button, RadioGroup, Heading, Text, majorScale, Label, FilePicker } from "evergreen-ui";


// Edit Profile component
const EditUserType = ({ nextStep }) => {
  // SET and GET Therapist/Client state
  const [isTherapist, setIsTherapist] = useState(true)
  const [preferredName, setPreferredName] = useState('')
  const [lastName, setLastName] = useState('')
  const [short_summary, setShortSummary] = useState('')
  const [image, setImage] = useState('')
  const [languages, setLanguages] = useState([])
  const [options] = useState([
    { label: 'Im a Therapist', value: 'Therapist' },
    { label: 'Im a client', value: 'Client' }
  ])
  const [value, setValue] = useState('Therapist')
  const { id } = useParams()
  const history = useHistory();
  const dispatch = useDispatch()

  const tempUserObj = {
    profile: {
      first_name: preferredName,
      last_name: lastName,
      short_summary: short_summary,
      long_summary: short_summary,
      languages: languages,
      user_id: parseInt(id),
      avatar_img: image
    }
  }

  useEffect(() => {
    setIfUserIsTherapist()
  })

  const formData = new FormData()

  const handleSubmit = e => {
    e.preventDefault()
    console.log(tempUserObj)
    dispatch(storeNames(tempUserObj))
    therapistOrClient()
    if (isTherapist) {
      nextStep()
    } else {
      history.push('/therapists')
    }
  }

  const handleRadio = (e) => {
    setValue(e.target.value)
    setIfUserIsTherapist()
  }

  const setIfUserIsTherapist = () => {
    if (
      value === 'Therapist' ? setIsTherapist(true) : setIsTherapist(false)
    );
  }

  const therapistOrClient = () => {
    if (isTherapist) {
      formData.append('user_id', parseInt(id))
      formData.append('first_name', preferredName)
      formData.append('last_name', lastName)
      formData.append('short_summary', short_summary)
      formData.append('long_summary', short_summary)
      formData.append('avatar_img', image)
      console.log("Therapist is true")
      console.log(formData)
      dispatch(createTherapist(formData))
      const therapist_id = localStorage.getItem("therapist_id")
      // history.push(`/therapists/${therapist_id}`)
    } else {
      formData.append('user_id', parseInt(id))
      formData.append('first_name', preferredName)
      formData.append('last_name', lastName)
      formData.append('short_summary', short_summary)
      formData.append('long_summary', short_summary)
      formData.append('avatar_img', image)
      console.log("Therapist is false")
      console.log(formData)
      dispatch(createClient(formData))
      // history.push(`/therapists`)
    }
  }

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
            <form onSubmit={handleSubmit}>
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
              <Pane
                marginY={majorScale(1)}
                className='form-group'>
                <Label htmlFor="add_profile_image" marginBottom={4} display="block">
                  Stand out with a smile!
                </Label>
                <FilePicker
                  single
                  id="add_profile_image"
                  width={250}
                  onChange={file => {
                    setImage(file[0])
                    console.log(file[0])
                  }}
                  placeholder="Select the file here!"
                />
              </Pane>
              <Pane
                marginY={majorScale(3)}
                className='form-group'>
                <Label htmlFor="add_profile_image" marginBottom={4} display="block">
                  What are you here for?
                </Label>
                <RadioGroup
                  size={16}
                  value={value}
                  options={options}
                  onChange={event => handleRadio(event)}
                />
              </Pane>
              <br />
              <Pane>
                {' '}
                {isTherapist ? (
                  <Pane>
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
                  </Pane>
                ) : (
                  'No worries, were here to help you get in touch with someone right for you'
                )}{' '}
              </Pane>
              <br />
              <Button type='submit' appearance="primary">
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
