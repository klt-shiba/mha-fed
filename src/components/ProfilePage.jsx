import React, { useContext, useState, useEffect } from "react";
import { Pane, Button } from "evergreen-ui";
import { UserContext } from "../UserContext";
import { logUserOut } from "../reducers/userActions";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import Section from "./Section";
import InfoBlock from "./InfoBlock";
import PageTitle from "./PageTitle";



const ProfilePage = () => {

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

    const checkUserType = () => {
        if (!user) {
            setUserAttributes(null)
            setIsTherapist(null)
            return false
        } else if (user.attributes.client === null) {
            setUserAttributes(user.attributes.therapist)
            setIsTherapist(true)
        } else if (user.attributes.therapist === null) {
            setUserAttributes(user.attributes.client)
            setIsTherapist(false)
        } else {
            setUserAttributes(null)
            setIsTherapist(null)
            return false
        }
    }


    const redirectToCorrectPage = () => {
        const staticId = id
        if (!user) {
            console.log("false")
            return false
        } else if (staticId != user.id) {
            console.log(id)
            console.log(user.id)
            history.push(`/users/${user.id}/profile`)
        } else {
            console.log(id)
            console.log(user.id)
            return false
        }
    }

    const returnName = () => {
        return (
            userAttributes ? `Welcome ${userAttributes.first_name}` : "My Profile"
        )
    }

    return (
        <>
            <PageTitle
                isSmall
                title={returnName()}
                summary="Review and update your details."
            />
            <Section
                backgroundColour="#fff"
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
                                content={JSON.stringify(userAttributes, null, 1)}
                                links={
                                    <Link to={`/users/${id}/update-profile`}>
                                        Update personal information
                                    </Link>}>
                            </InfoBlock>
                            <InfoBlock
                                heading="Account details"
                                content={JSON.stringify(user, null, 1)}
                                links={
                                    <Link to={`/users/${id}/update-account`}>
                                        Update account information
                                    </Link>}>
                            </InfoBlock>
                            {
                                isTherapist ?
                                    <InfoBlock
                                        heading="Therapist profile"
                                        content={JSON.stringify(userAttributes, null, 1)}
                                        links={
                                            <Link to={`/users/${id}/update-account`}>
                                                Update therapist information
                                            </Link>}>
                                    </InfoBlock> :
                                    false
                            }
                            <Pane display="flex" alignItems="right" width="100%">
                                <Pane flex={1} alignItems="center" display="flex">
                                </Pane>
                                <Pane
                                    alignItems="right">
                                    <Button
                                        type="submit"
                                        appearance="primary"
                                        size="large"
                                        onClick={handleClick}>
                                        Log Out
                                    </Button>
                                </Pane>
                            </Pane>
                        </Pane>

                    </Pane >
                </Container >
            </Section>
        </>
    )
}

export default ProfilePage