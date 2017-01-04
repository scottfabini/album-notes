import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating';

describe('Render <Rating> components', () => {
  it('render basic <Rating> with 11 stars, 3 highlighted', () => {
    const div = document.createElement('div');
    const fields = [{
      'id': 'Hello id', 
      'label': 'Hello Label'
    }];
    ReactDOM.render(
      <Rating defaultValue={3} max={11}></Rating>
      , div
    );
    expect(ReactDOM.findDOMNode(div).children[0].nodeName).toEqual('DIV');
    expect(ReactDOM.findDOMNode(div).children[0].children.length).toEqual(12);
    {/* Using querySelectorAll to select all spans of class Rating */}
    expect(ReactDOM.findDOMNode(div).querySelectorAll('span.RatingOn').length).toEqual(3);
    });
});