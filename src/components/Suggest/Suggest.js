import React, {Component, PropTypes} from 'react';

class Suggest extends Component {
  getValue() {
    return this.refs.lowlevelinput.value;
  }

  render() {
    const datalistid = Math.random.toString(16).substring(2);
    return (
      <div>
        <input
          /*By specifying a list=, that makes this a 'datalist' 
          (dropdown) input*/
          list={datalistid}
          /* the ref lowlevelinput allows the function getValue() 
          to get the current status of the value variable in this scope*/
          ref="lowlevelinput"
        />
        <datalist id={datalistid}> 
        {/*
        Note that Array.map takes as an argument a callback with up to 3 arguments.
        1) currentValue, 2) index of array element being processed, 3) the array map was called upon.
        So (item, idx) corresponds to a callback function to take the array item, 
        and the index of that item. The index can be used as the key for the options list 
        */}
        {this.props.options.map((item, idx) => 
          <option value={item} key={idx} />)}</datalist>
      </div>
    );
  }
}

/**
  options are the list (array of strings) of what to choose from in the drop-down
 */
Suggest.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string)
};

export default Suggest;