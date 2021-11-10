import { Heading, Pane } from "evergreen-ui";
import React from "react";

const NavBar = () => {
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
                {/* {this.props.children} */}
            </Pane>
        </Pane>
    );
}

export default NavBar;
