import React from 'react';
import ReactDOM from 'react-dom';
import Suggest from './Suggest';

describe('Render <Suggest> components', () => {
  it('render basic <Suggest> with 11 stars, 3 highlighted', () => {
    const div = document.createElement('div');
    const options = ["eenie", "meenie", "miney", "mo"];
    ReactDOM.render(
      <Suggest options={options}></Suggest>
      , div
    );
   
    expect(ReactDOM.findDOMNode(div).children[0].nodeName).toEqual('DIV');
    expect(ReactDOM.findDOMNode(div).children[0].children.length).toEqual(2);
    expect(ReactDOM.findDOMNode(div).querySelectorAll('option').length).toEqual(4);
    });
});