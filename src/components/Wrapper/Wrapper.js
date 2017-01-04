import React, {Component} from 'react';

/*
  Wrapper function, useful for components tested using TestUtils.renderIntoDocument
*/
class Wrapper extends Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

export default Wrapper