import firebase from 'firebase/app';
import 'firebase/database';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'

import Root from './_root';
import mgnUa from 'mgn-ua';

/*
** Firebase Initialize
*/
// const config = {
//     apiKey: "AIzaSyAoCKwZTDg2cnk4EL__2F551peIH409Mug",
//     authDomain: "device-rental.firebaseapp.com",
//     databaseURL: "https://device-rental.firebaseio.com",
//     projectId: "device-rental",
//     storageBucket: "",
//     messagingSenderId: "911109915400"
// };
// firebase.initializeApp(config);


/*
** Create Store
*/
const initialState = {
    list: null
};
let store = createStore(reducer,initialState);

window.html = document.getElementsByTagName('html')[0];
window.ua = new mgnUa();

/*
** Onload
*/
window.onload = () => {

    /* Firebase Initialize */
    // window.database = firebase.database();
    //
    // window.userRef = window.database.ref('users');
    // window.devideRef = window.database.ref('devices');
    /* Firebase Initialize */

    /*
    ** React
    */
    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        document.getElementById('app')
    );

};
