import { Heading, Pane, Avatar, Button } from "evergreen-ui";
import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import styled from 'styled-components'

const NavBar = ({ hasToken }) => {

    const { user, setUser } = useContext(UserContext)
    const renderAvatar = () => {
        const id = user.id
        if (!user) {
            return false
        } else {
            return (
                <Link
                    to={`/users/${id}/profile`}>
                    <Avatar
                        src=""
                        name={user.attributes.email}
                        size={40}
                    />
                </Link>
            )
        }
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
        hasToken()
    }

    const renderMenuItems = () => {

        if (!user) {
            hasToken()
            return (
                <div>{renderLoginRegisterButtons()}</div>
            )
        } else {
            return (
                <div>{renderAvatar()} </div>
            )
        }
    }


    useEffect(() => {
        renderMenuItems()
    }, [user])

    return (
        <Pane
            flexShrink={0}
            display="flex"
            padding={12}
            background="white"
            borderRadius={3}
        >
            <Pane flex={1}
                alignItems="left"
                display="flex"
                alignItems="center">
                <Pane
                    marginLeft="12px"
                    marginRight="12px">
                    <Link
                        to="/">
                        <Heading
                            size={600}
                            color="black"
                            textAlign="left"
                        >
                            Home
                        </Heading>
                    </Link>
                </Pane>
                <Pane
                    marginLeft="12px"
                    marginRight="12px">
                    <Link
                        to="/therapists">
                        <Heading
                            size={600}
                            color="black"
                            textAlign="left"
                        >
                            Therapists
                        </Heading>
                    </Link>
                </Pane>
            </Pane>
            <Pane
                display="flex"
                alignItems="center">
                {renderMenuItems()}
            </Pane>
        </Pane >
    );
}

export default NavBar;
