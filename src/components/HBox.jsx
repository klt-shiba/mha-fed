import { Pane } from 'evergreen-ui';
import PropTypes from 'prop-types';
import React from 'react';

const HBox = () => {

    return <Pane display="flex"
        flexDirection="row"
        flexWrap="wrap"
        className="hbox"
        {...this.props}>
        {this.props.children}
    </Pane>;

}

HBox.propTypes = {
    spacing: PropTypes.number
};

export default HBox;