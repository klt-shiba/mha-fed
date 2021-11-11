import { Pane } from 'evergreen-ui';
import React from 'react';

const GettingStarted = () => {

    return <Pane display="flex"
        flexDirection="row"
        flexWrap="wrap"
        className="hbox"
        {...this.props}>
        {this.props.children}
    </Pane>;

}



export default GettingStarted;