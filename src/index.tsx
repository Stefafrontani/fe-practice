import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/analytics';

firebase.initializeApp({
  "apiKey": "AIzaSyDaI8NDI_uU5hpaeXXyMOtPBrf7hP2qjvY",
  "appId": "1:56870407467:web:5f4bc1221fec08e5ac496e",
  "authDomain": "e-law-83343.firebaseapp.com",
  "databaseURL": "https://e-law-83343.firebaseio.com",
  "measurementId": "G-H7ZSE1V3W6",
  "messagingSenderId": "56870407467",
  "projectId": "e-law-83343",
  "storageBucket": "e-law-83343.appspot.com"
});
firebase.analytics();

ReactDOM.hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
