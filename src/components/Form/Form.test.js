import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

describe('Render <Form> components', () => {
  it('render basic Form', () => {
    const div = document.createElement('div');
    const fields = [{
      'id': 'Hello id', 
      'label': 'Hello Label'
    }];
    ReactDOM.render(
      <Form fields={fields}></Form>
      , div
    );
    expect(ReactDOM.findDOMNode(div).children[0].nodeName).toEqual('FORM');
    expect(ReactDOM.findDOMNode(div).children[0].className).toContain('Form');
    expect(ReactDOM.findDOMNode(div).children[0].children[0].nodeName).toEqual('DIV');
    expect(ReactDOM.findDOMNode(div).children[0].children[0].className).toContain('FormRow');
    

    });
});