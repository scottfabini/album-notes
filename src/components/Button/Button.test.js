import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';


describe('A passing test', function() {
  it('should pass a basic test', function() {
    expect(true).toBe(true);
  });
});

describe('Render <Button> components', () => {
  it('renders <button> vs. <a>', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Button>Hello</Button>
      , div
    );
    expect(ReactDOM.findDOMNode(div).children[0].nodeName).toEqual('BUTTON');
  });
});

describe('Render <A> components', () => {
  it('renders <a> vs. <button>', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Button href="#">Hello</Button>
      , div
    );
    expect(ReactDOM.findDOMNode(div).children[0].nodeName).toEqual('A');
  });
});