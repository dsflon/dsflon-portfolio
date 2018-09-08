import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'

import Root from './_root';
import FireInit from './fireinit';
import mgnUa from 'mgn-ua';

window.ua = new mgnUa();
window.html = document.getElementsByTagName('html')[0];

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
