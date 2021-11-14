import { Heading, Pane, Avatar } from "evergreen-ui";
import React from "react";

const NavBar = (props) => {
    return (
        <Pane
            flexShrink={0}
            display="flex"
            padding={16}
            background="purple600"
            borderRadius={3}
        >
            <Pane flex={1} alignItems="center" display="block">
                <Heading
                    size={600}
                    color="white"
                    textAlign="center"
                >Navigation (tbc)</Heading>
            </Pane>
            <Pane display="flex" alignItems="center">
                <Avatar
                    isHidden={props.hidden}
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
                    name="Alan Turing"
                    size={40}
                />
            </Pane>
        </Pane>
    );
}

export default NavBar;
