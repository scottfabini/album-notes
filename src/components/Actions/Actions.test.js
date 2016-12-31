import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils'
import Actions from './Actions';
import Wrapper from '../Wrapper/Wrapper';

describe('A passing test', function() {
  it('should pass a basic test', function() {
    expect(true).toBe(true);
  });
});

describe('Render <Actions> components', () => {
  it('renders <Actions>', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Actions>Hello</Actions>
      , div
    );
    expect(div).toBeDefined();
  });
});

describe('Click some actions', () => {
  it('calls you back 3 times (one for each span)', () => {
    const callback = jest.fn(); // mock function
    const actions = TestUtils.renderIntoDocument(
      <Wrapper><Actions onAction={callback} /></Wrapper>
    );
    TestUtils
      .scryRenderedDOMComponentsWithTag(actions, 'span')
      .forEach(span => TestUtils.Simulate.click(span));
    const calls = callback.mock.calls;
    expect(calls.length).toEqual(3);
  })
})