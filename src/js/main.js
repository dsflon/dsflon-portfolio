import firebase from 'firebase/app';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'

import Root from './_root';
import mgnUa from 'mgn-ua';

window.ua = new mgnUa();
window.html = document.getElementsByTagName('html')[0];

/*
** Firebase Initialize
*/
const config = {
    apiKey: "AIzaSyBjnA-8mNLtluLH69mnFP7oFcJrHF8C4z4",
    authDomain: "dsflon-portfolio.firebaseapp.com",
    databaseURL: "https://dsflon-portfolio.firebaseio.com",
    projectId: "dsflon-portfolio",
    storageBucket: "dsflon-portfolio.appspot.com",
    messagingSenderId: "216748225524"
};
firebase.initializeApp(config);

/*
** Create Store
*/
const initialState = {
    list: null,
    post: null,
    login: null,
    pass: "aaa"
};
let store = createStore(reducer,initialState);

/*
** React
*/
ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('app')
);
