import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createTherapist } from '../reducers/therapistActions'
import { createClient } from '../reducers/clientActions'
import { TextInputField, Textarea, Pane, Button, RadioGroup, majorScale, Label, FilePicker, Select } from "evergreen-ui";
import Section from "./Section";
import PageTitle from './PageTitle'
import { UserContext } from "../UserContext";
import LinearProgress from '@mui/material/LinearProgress';
import { Container } from "reactstrap";
import ButtonWrapper from "./ButtonWrapper";

// Edit Profile component
const EditUserType = ({ nextStep }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userReducer.user)
  const therapistStore = useSelector(state => state.therapistReducer)
  const clientStore = useSelector(state => state.clientReducer)
  // SET and GET Therapist/Client state
  const { user, setUser } = useContext(UserContext)
  const [isTherapist, setIsTherapist] = useState(true)
  const [preferredName, setPreferredName] = useState('')
  const [lastName, setLastName] = useState('')
  const [short_summary, setShortSummary] = useState('')
  const [image, setImage] = useState('')
  const [state, setState] = useState('Auckland')
  const [profession, setProfession] = useState('Psychotherapist')
  const [options] = useState([
    { label: 'Im a Therapist', value: 'Therapist' },
    { label: 'Im a Client', value: 'Client' }
  ])
  const [value, setValue] = useState('Therapist')
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

  useEffect(() => {
    setIfUserIsTherapist()
  }, [value])

  const formData = new FormData()

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    therapistOrClient()
  }

  useEffect(() => {
    redirectWhenUserReturned()
  }, [therapistStore, clientStore])

  const redirectWhenUserReturned = () => {

    if (!therapistStore.isTherapist && !clientStore.isClient) {
      return false
    } else if (therapistStore.isTherapist) {
      setIsLoading(false)
      nextStep()
    } else if (clientStore.isClient) {
      setIsLoading(false)
      history.push('/therapists')
    } else {
      setIsLoading(false)
      return false
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
      formData.append('user_id', parseInt(userStore?.data.id))
      formData.append('first_name', preferredName)
      formData.append('last_name', lastName)
      formData.append('short_summary', short_summary)
      formData.append('long_summary', short_summary)
      formData.append('city', state)
      formData.append('profession', profession)
      formData.append('avatar_img', image)
      dispatch(createTherapist(formData))
    } else {
      formData.append('user_id', parseInt(userStore?.data.id))
      formData.append('first_name', preferredName)
      formData.append('last_name', lastName)
      formData.append('avatar_img', image)
      dispatch(createClient(formData))
    }
  }

  const renderSelectState = () => {
    return (
      <Pane
        marginY={majorScale(3)}
        className='form-group'>
        <Label htmlFor="add_therapist_city" marginBottom={8} display="block">
          What city do you reside in?
        </Label>
        <Select
          height={40}
          width="100%"
          onChange={e => setState(e.target.value)}>
          {stateObject.map((el, index) => {
            return (
              <option key={index} value={el.name}>
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
        <Label htmlFor="add_therapist_profession" marginBottom={8} display="block">
          What type of therapist are you?
        </Label>
        <Select
          height={40}
          width="100%"
          fontSize="20px"
          onChange={e => setProfession(e.target.value)}>
          {professionObj.map((el, index) => {
            return (
              <option key={index} value={el.name}>
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
        <Container fluid="xl">
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="left">
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
                    <ButtonWrapper>
                      <Button
                        type="submit"
                        appearance="primary"
                        size="large"
                        fontSize="17px">
                        Create profile
                      </Button>
                    </ButtonWrapper>
                  </Pane>
                </form>
              </Pane>
            </Pane>
          </Pane>
        </Container>
      </Section >
    </>
  )
}

export default EditUserType
