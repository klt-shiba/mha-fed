import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Pane, majorScale, TextInputField, FilePicker, Label, Button } from "evergreen-ui";
import { useHistory } from "react-router";
import Section from './Section'
import PageTitle from "./PageTitle";
import { Container } from "reactstrap";
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from "react-redux";
import { updateTherapistUser } from "../reducers/therapistActions"


const UpdateUserType = () => {
    const therapistStore = useSelector(state => state.therapistReducer)
    const { user, setUser } = useContext(UserContext)
    const [isTherapist, setIsTherapist] = useState(null)
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        avatar_img: "",
        user_id: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const userId = user ? user.id : null
    let urlId = ""
    const formData = new FormData()
    const dispatch = useDispatch()

    const checkUserType = () => {
        if (!user) {
            setIsTherapist(null)
            return false
        } else if (user?.attributes?.client === null) {
            setIsTherapist(true)
            urlId = user.attributes.therapist.id
        } else if (user?.attributes?.therapist === null) {
            setIsTherapist(false)
            urlId = user.attributes.client.id
        } else {
            setIsTherapist(null)
            return false
        }
    }

    useEffect(() => {
        checkUserType()
    }, [user])

    useEffect(() => {
        redirectUserAfterUserUpdated(therapistStore)
    }, [therapistStore])

    const history = useHistory()


    const routeToProfile = () => {
        history.push(`/users/${user.id}/profile`)
    }

    const handleClick = (e) => {
        e.preventDefault()
        switch (e.target.value) {
            case "Cancel":
                routeToProfile()
                break;
            case "Submit":
                setIsLoading(true)
                patchDetails()
                break;
            default:
                console.log("Not working")
        }
    }

    const redirectUserAfterUserUpdated = (user) => {
        if (user.hasError || user.hasError === undefined) {
            return false
        } else {
            setIsLoading(false)
            routeToProfile()
        }
    }

    const patchDetails = () => {

        formData.append('user_id', userId)
        formData.append('first_name', form.first_name)
        formData.append('last_name', form.last_name)
        formData.append('avatar_img', form.avatar_img)

        checkUserType()

        dispatch(updateTherapistUser(urlId, formData))

    };

    return (
        <>
            <PageTitle
                isSmall
                title="Update personal details"
                hasBackgroundColour="#bba4dc"
                summary="Review and update your personal details."
            />
            {isLoading && <LinearProgress sx={{ height: '8px', bgcolor: 'white', color: 'purple' }} />}
            {console.log(therapistStore)}
            <Section
                backgroundColour="#fafafa"
                hasPaddingTop
                hasPaddingBottom>
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
                                marginBottom={40}>
                                <TextInputField
                                    type='text'
                                    className='form-control'
                                    label="Preferred name"
                                    id='therapist_first_name'
                                    aria-describedby='therapist_first_name'
                                    placeholder='Preferred name'
                                    inputHeight={48}
                                    onChange={e => setForm({
                                        ...form,
                                        first_name: e.target.value
                                    })}
                                    value={form.first_name}
                                />
                                <TextInputField
                                    type='text'
                                    label="Last name"
                                    className='form-control'
                                    id='therapist_last_name'
                                    placeholder='Last name'
                                    inputHeight={48}
                                    onChange={e => setForm({
                                        ...form,
                                        last_name: e.target.value
                                    })}
                                    value={form.last_name}
                                />
                                <Pane
                                    marginY={majorScale(1)}
                                    className='form-group'>
                                    <Label htmlFor="edit_profile_image" marginBottom={4} display="block">
                                        Stand out with a smile!
                                    </Label>
                                    <FilePicker
                                        single
                                        id="edit_profile_image"
                                        width={250}
                                        inputHeight={48}
                                        onChange={file => setForm({
                                            ...form,
                                            avatar_img: file[0]
                                        })
                                        }
                                        placeholder="Select the file here!"
                                    />
                                </Pane>
                            </Pane>
                            <Pane display="flex">
                                <Pane flex={1} alignItems="center" display="flex">

                                </Pane>
                                <Pane>
                                    <Button
                                        type="submit"
                                        appearance="default"
                                        size="large"
                                        height={48}
                                        fontSize="17px"
                                        marginRight={16}
                                        value="Cancel"
                                        onClick={handleClick}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        appearance="primary"
                                        size="large"
                                        value="Submit"
                                        onClick={handleClick}
                                        height={48}
                                        fontSize="17px">
                                        Update account
                                    </Button>
                                </Pane>
                            </Pane>
                        </Pane>
                    </Pane>
                </Container>
            </Section>
        </>
    )
}

export default UpdateUserType