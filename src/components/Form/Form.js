import FormInput from '../FormInput/FormInput';
//import Rating from '../Rating/Rating';
import React, {Component, PropTypes} from 'react';

class Form extends Component {
  getData() {
    let data = {};
    this.props.fields.forEach(field =>
      data[field.id] = this.refs[field.id].getValue());
    return data;
  }
  render() {
    return (
      <form className="Form">
      {this.props.fields.map(field => {
        const prefilled = this.props.initialData && this.props.initialData[field.id];
        if (!this.props.readonly) {
          return (
            <div className="FormRow" key={field.id}>
            <label className="FormLabel" htmlFor={field.id}>{field.label}:</label>
            <FormInput {...field} ref={field.id} defaultValue={prefilled} />
            </div>
          );
        }
        if (!prefilled) {
          return null;
        }
        return (
          <div>
            
          </div>);
      }, this)}</form>
    );
  }
}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string)
  })).isRequired,
  initialData: PropTypes.object,
  readonly: PropTypes.bool
};

export default Form;