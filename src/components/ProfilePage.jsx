import React, { useContext } from "react";
import { Pane, majorScale, Heading, Text } from "evergreen-ui";
import { UserContext } from "../UserContext";

const ProfilePage = () => {

    const { user, setUser } = useContext(UserContext)

    return (
        <Pane>
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

                    <Pane
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
                    </Pane >
                </Pane>
            </Pane >
        </Pane>
    )
}

export default ProfilePage