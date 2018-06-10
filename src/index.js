// @flow
import './mockApi'; // mock out api (fetch) for local testing/demo
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');
if (root) ReactDOM.render(<App />, root);
registerServiceWorker();
