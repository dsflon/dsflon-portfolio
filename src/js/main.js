import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'

import Root from './_root';
import mgnUa from 'mgn-ua';

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

window.html = document.getElementsByTagName('html')[0];
window.ua = new mgnUa();

/*
** React
*/
ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('app')
);
