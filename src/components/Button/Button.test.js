import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

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
  it('renders <a> instead of <button>when an href prop is passed in', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Button href="#">Hello</Button>
      , div
    );
    expect(ReactDOM.findDOMNode(div).children[0].nodeName).toEqual('A');
  });
});