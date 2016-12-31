import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';
require('./style.css');

class Rating extends Component {
  // The constructor initializes state via the props passed in
  constructor(props) {
    super(props);
    // defaultValue is passed in to initialize both rating/tmpRating
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue
    };
  }
  // well there's your getter pattern for state
  getValue() {
    return this.state.rating;
  }

  // and there's your setter
  setTemp(rating) {
    this.setState({tmpRating: rating});
  }

  /* 
  these function names are confusing. 
  */
  setTmpRatingAndRating(rating) {
    this.setState({
      tmpRating: rating,
      rating: rating
    });
  }

  /*
    This is used as a callback.
    On mouse out, this is bound as a function to reset tmpRating back to current rating.
  */
  resetTmpRating() {
    this.setTemp(this.state.rating);
  }
  /* 
  componentWillReceiveProps is a lifecycle method of React.
  Props are used to configure a component (so far I've thought
  of it mainly as just /initializing/ a component). Property values
  though may change from the outside. This method is key to React's 
  responsiveness. You can re-set/initialize components constantly by 
  updating their props.
  */
  componentWillReceiveProps(nextProps) {
    this.setTmpRatingAndRating(nextProps.defaultValue);
  }

  /*
    Every time state changes, a re-render occurs and this code runs again. 
  */
  render() {
    const stars = [];
    for (let i = 1; i <= this.props.max; i++) {
      stars.push(
        /* 
          This span is constantly looking for whether state.tmpRating === false.
          If true, className='RatingOn', 
         */
        <span
        className={i <= this.state.tmpRating ? 'RatingOn' : null}
        key={i}
        /* possible pattern here: using this.props.readonly && to shortcut */
        onClick={!this.props.readonly && this.setTmpRatingAndRating.bind(this, i)}
        onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)}
        >
        &#9734;
        </span>);
    }
    return (
      <div
      className={classNames({
        'Rating': true,
        'RatingReadonly': this.props.readonly
      })}
      onMouseOut={this.resetTmpRating.bind(this)}
      >
      {stars}
      {this.props.readonly || this.props.id
        ? null
        : <input
          type="hidden"
          id={this.props.id}
          value={this.state.rating} />
      }
      </div>
    );
  }
}

Rating.propTypes = {
  // defaultValue initializes rating/tempRating state
  defaultValue: PropTypes.number, // propType that inits state
  readonly: PropTypes.bool, // propTypes that specify behavior for the component
  max: PropTypes.number
};
Rating.defaultProps = {
  defaultValue: 0,
  max: 5
};

export default Rating;