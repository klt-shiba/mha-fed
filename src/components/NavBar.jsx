import { Heading, Pane, Avatar, Button } from "evergreen-ui";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";

const NavBar = (props) => {

    const { user, setUser } = useContext(UserContext)
    const token = localStorage.getItem("token")

    const history = useHistory()

    const renderAvatar = () => {
        const id = user.id
        return (
            <Link
                to={`/users/${id}/profile`}>
                <Avatar
                    src=""
                    name={user.attributes.client.first_name}
                    size={40}
                />
            </Link>
        )
    }

    const renderLoginRegisterButtons = () => {

        return (
            <Pane>
                <Link
                    to={`/login`}>
                    <Button appearance="primary" onClick={handleChange}>Login</Button>
                </Link>
                <Link
                    to={`/register`}>
                    <Button appearance="secondary">Register</Button>
                </Link>
            </Pane>
        )
    }

    const handleChange = () => {
        props.hasToken()
    }




    return (
        <Pane
            flexShrink={0}
            display="flex"
            padding={16}
            background="purple600"
            borderRadius={3}
        >
            <Pane flex={1}
                alignItems="left"
                display="flex">
                <Link
                    to="/">
                    <Heading
                        size={600}
                        color="white"
                        textAlign="left"
                    >
                        Home
                    </Heading>
                </Link>
            </Pane>
            <Pane
                flex={1}
                alignItems="left"
                display="flex">
                <Link
                    to="/therapists">
                    <Heading
                        size={600}
                        color="white"
                        textAlign="left"
                    >
                        Therapists
                    </Heading>
                </Link>
            </Pane>
            <Pane
                display="flex"
                alignItems="center">
                {(!user) ?
                    <div>{renderLoginRegisterButtons()}</div>
                    : <div>{renderAvatar()} </div>
                }
            </Pane>
        </Pane>
    );
}

export default NavBar;
