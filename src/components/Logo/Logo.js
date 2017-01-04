import classNames from 'classnames';
import React from 'react';
require('./style.css');


class Logo extends React.Component {
  render() {
    /* classNames simply extends the current class list of the div to include 'Logo', which has CSS style associated with it */
    return <div className={classNames('Logo', this.props.className)} />;
    
  }
}

export default Logo;