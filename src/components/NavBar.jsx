import { Heading, Pane, Avatar, Button, HeartIcon, HomeIcon } from "evergreen-ui";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const NavBar = ({ hasToken }) => {

    const { user, setUser } = useContext(UserContext)
    const [userAttributes, setUserAttributes] = useState(null)

    const renderAvatar = () => {
        console.log(user)
        const id = user.attributes.slug
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
            <Pane
                alignItems="right"
                display="flex">
                <Pane
                    marginLeft="6px"
                    marginRight="6px">
                    <Link
                        to={`/login`}>
                        <Button appearance="default" onClick={handleChange}>Login</Button>
                    </Link>
                </Pane>
                <Pane
                    marginLeft="6px"
                    marginRight="6px">
                    <Link
                        to={`/register`}>
                        <Button appearance="primary">
                            Sign up</Button>
                    </Link>
                </Pane>
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
        <><Pane
            display="absolute">
            <Pane
                flexShrink={0}
                display="flex"
                padding={16}
                borderRadius={0}
            >
                <Pane flex={1}
                    alignItems="left"
                    display="flex"
                    alignItems="center">
                    <Pane
                        marginLeft="0px"
                        marginRight="8px">
                        <Link
                            to="/"
                            style={{ textDecoration: 'none', color: "#6d23b6", fontSize: "20px", fontWeight: "800" }}
                            activeStyle={{ backgroundColour: "#6d23b6", color: "black" }}
                            activeClassName="active">
                            <Pane
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center">
                                {/* <HomeIcon
                                    size={24}
                                    marginRight="8px"
                                    color="#6d23b6" /> */}
                                Home
                            </Pane>
                        </Link>
                    </Pane>
                    <Pane
                        marginLeft="8px"
                        marginRight="12px">

                        <Link
                            to="/therapists"
                            style={{ textDecoration: 'none', color: "#6d23b6", fontSize: "20px", fontWeight: "800" }}
                        >
                            <Pane
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center">
                                {/* <HeartIcon
                                    size={24}
                                    marginRight="8px"
                                    color="#6d23b6" /> */}
                                Therapists
                            </Pane>
                        </Link>
                    </Pane>
                </Pane >
                <Pane
                    display="flex"
                    alignItems="center">
                    {renderMenuItems()}
                </Pane>
            </Pane >
        </Pane>
        </>
    );
}

export default NavBar;
