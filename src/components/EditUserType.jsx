import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { storeNames } from '../reducers/tempUserActions'
import { createTherapist } from '../reducers/therapistActions'
import { createClient } from '../reducers/clientActions'
import { TextInputField, Textarea, Pane, Button, RadioGroup, Heading, Text, majorScale, Label, FilePicker } from "evergreen-ui";
import Section from "./Section";
import PageTitle from './PageTitle'
import { UserContext } from "../UserContext";

// Edit Profile component
const EditUserType = ({ nextStep }) => {
  // SET and GET Therapist/Client state
  const { user, setUser } = useContext(UserContext)
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
    <>
      <PageTitle
        isSmall
        title="Create your profile"
        summary="Tell us about yourself and why you are here"
        src="https://images.unsplash.com/photo-1559740451-b895701fa4b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
      />
      <Section
        backgroundColour="#fafafa"
        hasPaddingBottom
        hasPaddingTop>
        <Pane
          display="flex"
          flexDirection="column"
          className="vbox">
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center">

            <Pane
              width="100%"
              maxWidth='720px'>
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
                    inputHeight={48}
                  />
                  <TextInputField
                    type='text'
                    label="Last name"
                    className='form-control'
                    id='therapist_last_name'
                    placeholder='Manning'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    inputHeight={48}
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
                      inputHeight={48}
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
                          rows='5'
                          onChange={e => setShortSummary(e.target.value)}
                          value={short_summary}
                        />
                      </Pane>
                    ) : (
                      'No worries, were here to help you get in touch with someone right for you'
                    )}{' '}
                  </Pane>
                  <br />
                  <Pane display="flex">
                    <Pane flex={1} alignItems="center" display="flex">

                    </Pane>
                    <Pane>
                      <Button
                        type="submit"
                        appearance="primary"
                        size="large" >
                        Create profile
                      </Button>
                    </Pane>
                  </Pane>
                </form>
              </Pane>
            </Pane>
          </Pane>
        </Pane >
      </Section>
    </>
  )
}

export default EditUserType
