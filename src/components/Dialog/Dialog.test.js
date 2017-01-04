import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';

describe('Render minimal non-modal <Dialog> components', () => {
  it('render plain Dialog', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Dialog header="Hello"></Dialog>
      , div
    );
    expect(ReactDOM.findDOMNode(div).children[0].nodeName).toEqual('DIV');
    expect(ReactDOM.findDOMNode(div).children[0].className).toContain('Dialog');
    expect(ReactDOM.findDOMNode(div).children[0].children[0].nodeName).toEqual('DIV');
    expect(ReactDOM.findDOMNode(div).children[0].children[0].className).toEqual(""); // detect non-modal dialog, which has no className
  });
});

describe('Render modal <Dialog> components', () => {
  it('render modal Dialog', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Dialog header="Hello" modal={true}></Dialog>
      , div
    );
    
    expect(ReactDOM.findDOMNode(div).children[0].nodeName).toEqual('DIV');
    expect(ReactDOM.findDOMNode(div).children[0].className).toContain('DialogModal');
    expect(ReactDOM.findDOMNode(div).children[0].children[0].nodeName).toEqual('DIV');
    expect(ReactDOM.findDOMNode(div).children[0].children[0].className).toContain("DialogModalWrap");
  });
});
