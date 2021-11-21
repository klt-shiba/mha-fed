import React, { useContext } from "react";
import { Pane, majorScale, Heading, Text, Button } from "evergreen-ui";
import { UserContext } from "../UserContext";
import { logUserOut } from "../reducers/userActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import Section from "./Section";

const ProfilePage = () => {

    const { user, setUser } = useContext(UserContext)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams();

    const handleClick = (e) => {

        e.preventDefault()
        dispatch(logUserOut())

        if (user) {
            history.push('')
        } else {
            console.log("error")
        }
    }
    return (
        <>
            <Container fluid="xl">
                {JSON.stringify(user, null, 1)}
                <Pane
                    display="flex"
                    flexDirection="column"
                    className="vbox">
                    <Pane
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        marginY={majorScale(4)}>

                        <Section
                            max-width="480px"
                            display="block"
                            textAlign="center">
                            <Pane>
                                <Heading
                                    size={900}
                                    is="h1"
                                    textAlign="center"
                                    marginY={majorScale(1)}>My Profile</Heading>
                                <Text
                                    size={600}
                                    textAlign="center">
                                    Review and update your details.
                                </Text>
                            </Pane>
                        </Section >
                    </Pane>
                    <Pane>
                        <Link to={`/users/${id}/update-profile`}>
                            Update personal information
                        </Link>
                    </Pane>
                    <Pane>
                        <Button onClick={handleClick}>Log Out</Button>
                    </Pane>
                </Pane >
            </Container>
        </>
    )
}

export default ProfilePage