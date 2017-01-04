import React, {PropTypes} from 'react';
require('./style.css');

/**
  The callers of the Actions component can sign up for the action event using the
  onAction property. 
  Example: <Actions onAction={type => alert(type)} />
  This pattern allows for a child to inform its parent of a change within the component.
*/
const Actions = props =>
  <div className="Actions">
    {/*Info action*/}
    <span
    tabIndex="0"
    className="ActionsInfo"
    title="More info"
    onClick={props.onAction.bind(null, 'info')}>&#8505;</span>
    {/*Edit action*/}
    <span
    tabIndex="0"
    className="ActionsEdit"
    title="Edit"
    onClick={props.onAction.bind(null, 'edit')}>&#10000;</span>
    {/*Delete action*/}
    <span
    tabIndex="0"
    className="ActionsDelete"
    title="Delete"
    onClick={props.onAction.bind(null, 'delete')}>x</span>
  </div>;

Actions.propTypes = {
  /**
   * A function prop, which will be bound and triggered on click of the action button 
   */
  onAction: PropTypes.func
};

Actions.defaultProps={
  /**
   * Default: empty function (ES6 arrow)
   */
  onAction: () => {}
};

export default Actions;