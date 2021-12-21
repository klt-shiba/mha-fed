import React, { useContext, useState, useEffect } from "react";
import { Pane, Button } from "evergreen-ui";
import { UserContext } from "../UserContext";
import { logUserOut } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import Section from "./Section";
import InfoBlock from "./InfoBlock";
import PageTitle from "./PageTitle";
import ButtonWrapper from "./ButtonWrapper";


const ProfilePage = () => {

    const userStore = useSelector(state => state.userReducer)
    const { user, setUser } = useContext(UserContext)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const { id } = useParams();
    const [userAttributes, setUserAttributes] = useState(null)
    const [isTherapist, setIsTherapist] = useState(null)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(logUserOut())
        if (user) {
            history.push('')
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        checkUserType()
    }, [user])


    useEffect(() => {
        redirectToCorrectPage()
    }, [id])

    useEffect(() => {
        redirectIfNoUser()
    }, [user, userStore])

    const checkUserType = () => {
        console.log(userStore)
        if (!user && !userStore.loggedIn) {
            setUserAttributes(null)
            setIsTherapist(null)
            return false
        } else if (userStore.user.attributes.therapist === null && userStore.user.attributes.client === null) {
            setUserAttributes(null)
            setIsTherapist(null)
        } else if (userStore.user.attributes.client === null) {
            setUserAttributes(userStore.user.attributes.therapist)
            setIsTherapist(true)
        } else if (userStore.user.attributes.therapist === null) {
            setUserAttributes(userStore.user.attributes.client)
            setIsTherapist(false)
        } else {
            setUserAttributes(null)
            setIsTherapist(null)
            return false
        }
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const redirectToCorrectPage = () => {
        const staticId = id
        console.log(user)
        if (!userStore.loggedIn) {
            return false
        } else if (staticId != id) {
            let id = userStore.user.attributes.slug
            history.push(`/users/${id}/profile`)
        } else {
            return false
        }
    }


    const redirectIfNoUser = () => {
        if (!user && !userStore.loggedIn) {
            history.push(`/`)
        } else {
            return false
        }
    }

    const returnName = () => {
        return (
            userAttributes ? `Welcome ${userAttributes.first_name}` : "My Profile"
        )
    }

    const renderPersonalInformation = () => {
        if (!userAttributes) {
            return null
        } else {
            return (
                <>
                    <div>
                        <b>Name:</b> {`${userAttributes.first_name} ${userAttributes.last_name}`}
                    </div>
                </>
            )

        }
    }


    const renderAccountInformation = () => {
        if (!user && !userAttributes) {
            return null
        } else {
            return (
                <>
                    <div style={{ marginBottom: "12px" }}>
                        <b>Email:</b> {`${userStore.user.attributes.email}`}
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                        <b>Password:</b> ************
                    </div>
                    <div>
                        {userAttributes ?
                            <><b>Account created:</b> {formatDate(userAttributes.created_at)}</> : false}
                    </div>
                </>
            )
        }
    }

    const renderTherapistInformation = () => {
        if (!userAttributes) {
            return null
        } else {
            return (
                <>
                    <div>
                        <b>Profession:</b> {`${userAttributes.profession}`}
                    </div>
                    <div>
                        <b>Based in:</b> {`${userAttributes.city}`}
                    </div>
                    <div>
                        <b>About me:</b> {`${userAttributes.long_summary}`}
                    </div>
                </>
            )

        }
    }


    return (
        <>
            <PageTitle
                isSmall
                title={returnName()}
                hasBackgroundColour="#bba4dc"
                summary="Review and update your details"
            />
            <Section
                backgroundColour="#fafafa"
                hasPaddingTop
                hasPaddingBottom>
                <Container fluid="xl">
                    <Pane
                        display="flex"
                        flexDirection="column"
                        className="vbox"
                        alignItems="center">
                        <Pane
                            width="100%"
                            maxWidth='720px'>
                            <InfoBlock
                                heading="Personal Information"
                                content={renderPersonalInformation()}
                                hasIcon
                                hasUpdateLink
                                links={
                                    <Link to={`/users/${id}/update-profile`}>
                                        Update
                                    </Link>}>
                            </InfoBlock>
                            {
                                isTherapist ?
                                    <InfoBlock
                                        heading="Therapist profile"
                                        content={renderTherapistInformation()}
                                        hasUpdateLink
                                        links={
                                            <Link to={!userAttributes ? `/therapists` : `/therapists/${userAttributes.slug}`}>
                                                Check out my profile
                                            </Link>}>
                                    </InfoBlock> :
                                    false
                            }
                            <InfoBlock
                                heading="Account details"
                                content={renderAccountInformation()}
                                hasUpdateLink
                                hasIcon
                                links={
                                    <Link to={`/users/${id}/update-account`}>
                                        Update
                                    </Link>}>
                            </InfoBlock>
                            <Pane display="flex" alignItems="right" width="100%">
                                <ButtonWrapper>
                                    <Button
                                        type="submit"
                                        appearance="default"
                                        size="large"
                                        height={48}
                                        fontSize="17px"
                                        onClick={handleClick}>
                                        Log Out
                                    </Button>
                                </ButtonWrapper>
                            </Pane>
                        </Pane >
                    </Pane >
                </Container >
            </Section>
        </>
    )
}

export default ProfilePage