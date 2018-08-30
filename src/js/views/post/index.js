import * as THREE from 'three';

import React from 'react';
import { Link, Route } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

// Common functions
import Fetch from '../../common/_fetch';

// import { Helmet } from "react-helmet";
import { ShowImg, FadeInImg, FadeOutImg, UpdateTextureImage, Dark } from '../three'

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        if( window.prevPage ) {
            Dark(0.2);
            UpdateTextureImage(location.search.split("img=")[1]);
            setTimeout( () => {
                window.scroll(0,0);
            }, 1000);
            setTimeout( FadeInImg, 1500)
        } else {

            if( location.search && location.search.split("img=")[1] ) {
                setTimeout( () => {
                    window.html.classList.remove("is_disabled");
                    Dark(0.2);
                    UpdateTextureImage(location.search.split("img=")[1]);
                }, 300)
                setTimeout( FadeInImg, 800)
            }

        }

        window.prevPage = "post";
    }
    componentWillUnmount() {
    }
    componentDidUpdate() {
    }

    StartThree(data) {
    }

    render() {

        this.state = this.props.state;
        this.actions = this.props.actions;
        this.history = this.props.props.history;

        // let list = this.state.list ? this.SetSection(this.state.list) : null;

        return (
            <div>

                <div id="post">
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                </div>

            </div>
        );

    }

}

const MapStateToProps = (state,ownProps) => {
    return { state: state };
}
const MapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(ActionCreators, dispatch) };
}

const Post = connect(
    MapStateToProps,
    MapDispatchToProps
)(App);

export default Post;
