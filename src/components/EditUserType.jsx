import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { storeNames } from '../reducers/tempUserActions'
import { createTherapist } from '../reducers/therapistActions'
import { createClient } from '../reducers/clientActions'
import { TextInputField, Textarea, Pane, Button, RadioGroup, majorScale, Label, FilePicker, Select } from "evergreen-ui";
import Section from "./Section";
import PageTitle from './PageTitle'
import { UserContext } from "../UserContext";
import LinearProgress from '@mui/material/LinearProgress';

// Edit Profile component
const EditUserType = ({ nextStep }) => {
  // SET and GET Therapist/Client state
  const { user, setUser } = useContext(UserContext)
  const [isTherapist, setIsTherapist] = useState(true)
  const [preferredName, setPreferredName] = useState('')
  const [lastName, setLastName] = useState('')
  const [short_summary, setShortSummary] = useState('')
  const [image, setImage] = useState('')
  const [state, setState] = useState('')
  const [profession, setProfession] = useState('Counsellor')
  const [options] = useState([
    { label: 'Im a Therapist', value: 'Therapist' },
    { label: 'Im a client', value: 'Client' }
  ])
  const [value, setValue] = useState('Therapist')
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const stateObject = [
    { name: "Auckland" },
    { name: "Wellington" },
    { name: "Christchurch" },
    { name: "Hamilton" },
    { name: "Tauranga" },
    { name: "Napier-Hastings" },
    { name: "Dunedin" },
    { name: "Palmerston North" },
    { name: "Nelson" },
    { name: "Rotorua" },
    { name: "Whangārei" },
    { name: "New Plymouth" },
    { name: "Invercargill" },
    { name: "Whanganui" },
    { name: "Gisborne" }
  ]

  const professionObj = [
    { name: "Psychotherapist" },
    { name: "Counsellor" },
    { name: "Social worker" },
    { name: "Psychologist" }
  ]

  const history = useHistory();
  const dispatch = useDispatch()



  const tempUserObj = {
    profile: {
      first_name: preferredName,
      last_name: lastName,
      short_summary: short_summary,
      long_summary: short_summary,
      state: state,
      profession: profession,
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
    setIsLoading(true)
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
      formData.append('state', state)
      formData.append('profession', profession)
      formData.append('avatar_img', image)
      console.log("Therapist is true")
      console.log(formData)
      dispatch(createTherapist(formData))
    } else {
      formData.append('user_id', parseInt(id))
      formData.append('first_name', preferredName)
      formData.append('last_name', lastName)
      formData.append('avatar_img', image)
      console.log("Therapist is false")
      console.log(formData)
      dispatch(createClient(formData))
    }
    setIsLoading(false)
  }

  const renderSelectState = () => {
    return (
      <Pane
        marginY={majorScale(3)}
        className='form-group'>
        <Label htmlFor="add_profile_image" marginBottom={8} display="block">
          What state do you reside in?
        </Label>
        <Select
          height={40}
          width="100%"
          onChange={e => setState(e.target.value)}>
          {stateObject.map((el) => {
            return (
              <option value={el.name}>
                {el.name}
              </option>
            )
          })}
        </Select>

      </Pane>
    )
  }
  const renderSelectProfession = () => {
    return (
      <Pane
        marginY={majorScale(3)}
        className='form-group'>
        <Label htmlFor="add_profile_image" marginBottom={8} display="block">
          What type of therapist are you?
        </Label>
        <Select
          height={40}
          width="100%"
          onChange={e => setProfession(e.target.value)}>
          {professionObj.map((el) => {
            return (
              <option value={el.name}>
                {el.name}
              </option>
            )
          })}
        </Select>

      </Pane>
    )
  }

  return (
    <>
      <PageTitle
        isSmall
        title="Create your profile"
        summary="Tell us about yourself and why you are here"
        hasBackgroundColour="#bba4dc"
      />
      {isLoading ? <LinearProgress sx={{ height: '8px', bgcolor: 'white', color: 'purple' }} /> : false}
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
                    <Label htmlFor="add_profile_image" marginBottom={8} display="block">
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
                        {renderSelectProfession()}
                        <Label htmlFor="therapist_about_myself" marginBottom={8} display="block">
                          Tell us about yourself
                        </Label>
                        <Textarea
                          type='text'
                          className='form-control'
                          id='therapist_about_myself'
                          placeholder={`${profession} specialising in Anxiety, Relationship Issues and Trauma and PTSD`}
                          rows='10'
                          onChange={e => setShortSummary(e.target.value)}
                          value={short_summary}
                        />
                        {renderSelectState()}
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
