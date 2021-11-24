import React, { useContext, useState, useEffect } from "react";
import { Pane, Button } from "evergreen-ui";
import { UserContext } from "../UserContext";
import { logUserOut } from "../reducers/userActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import Section from "./Section";
import InfoBlock from "./InfoBlock";
import PageTitle from "./PageTitle";



const ProfilePage = () => {

    const { user, setUser } = useContext(UserContext)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams();
    const [userAttributes, setUserAttributes] = useState(null)

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


    const checkUserType = () => {
        if (!user) {
            setUserAttributes(null)
            return false
        } else if (user.attributes.client === null) {
            setUserAttributes(user.attributes.therapist)
        } else if (user.attributes.therapist === null) {
            setUserAttributes(user.attributes.client)
        } else {
            setUserAttributes(null)
            return false
        }
    }
    const returnName = () => {
        return (
            userAttributes ? `Welcome ${userAttributes.first_name}` : "My Profile"
        )
    }

    const isTherapist = () => {

    }
    return (
        <>
            <PageTitle
                isSmall
                title={returnName()}
                summary="Review and update your details."
            />
            <Container fluid="xl">
                {JSON.stringify(user, null, 1)}
                {console.log(userAttributes)}
                <Pane
                    display="flex"
                    flexDirection="column"
                    className="vbox">
                    <Section>
                        <InfoBlock
                            heading="Personal Information"
                            content={JSON.stringify(userAttributes, null, 1)}
                            links={
                                <Link to={`/users/${id}/update-profile`}>
                                    Update personal information
                                </Link>}>
                        </InfoBlock>
                        {userAttributes ? (
                            <InfoBlock
                                heading="Account details"
                                content={JSON.stringify(user, null, 1)}
                                links={
                                    <Link to={`/users/${id}/update-account`}>
                                        Update account information
                                    </Link>}>
                            </InfoBlock>
                        ) : "Bye"}
                    </Section>
                    <Pane>
                        <Button onClick={handleClick}>Log Out</Button>
                    </Pane>
                </Pane >
            </Container >
        </>
    )
}

export default ProfilePage