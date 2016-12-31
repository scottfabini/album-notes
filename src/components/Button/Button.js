import classNames from 'classnames';
import React, {PropTypes} from 'react';

// Stateless functional component.  No render method.
function Button(props) {
  const cssclasses = classNames('Button', props.className);
  // if the button is passed an href prop, it returns <a>; else it returns a normal <button>.
  return props.href
  ? <a {...props} className={cssclasses} />
  : <button {...props} className={cssclasses} />;
}

Button.propTypes = {
	/**
	 An optional href url can be passed in to create an <a> tag (link) instead of a <button>
	 */
  href: PropTypes.string
};

export default Button;