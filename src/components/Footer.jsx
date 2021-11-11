import { Heading, Icon, Link, Pane } from "evergreen-ui";
import React from "react";

class ApplicationFooter extends React.Component {
    render() {
        //â¤
        return (
            <Pane marginTop="auto" display="flex" flexShrink={0} padding={16} background="purpleTint">
                <Pane flex={1} alignItems="center" display="flex" flexDirection="row">
                    <Heading size={100}>
                        Footer (tbc)
                    </Heading>
                </Pane>

                <Pane display="flex" alignItems="center" flexDirection="row">
                    {/* <Link
                        href="http://skitsanos.com"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        color="neutral"
                    >
                        designed with
                        <Icon
                            icon="heart"
                            color="warning"
                            size={12}
                            marginLeft={2}
                            marginRight={2}
                        />
                        at skitsanos
                    </Link> */}
                </Pane>
            </Pane>
        );
    }
}

export default ApplicationFooter;
