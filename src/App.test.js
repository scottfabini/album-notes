import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* More unit tests can be found in each of the ./components/ files */
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
