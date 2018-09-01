import * as THREE from 'three';

import React from 'react';
import { Link, Route } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

// Common functions
import Fetch from '../../common/_fetch';

// import { Helmet } from "react-helmet";
import { ShowImg, FadeInImg, FadeOutImg, UpdateTextureImage, Dark, DarkFade, WaveFadeIn } from '../three'

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        if( window.prevPage ) {
            UpdateTextureImage(location.search.split("img=")[1]);
            if( !window.ua.isSp ){
                // DarkFade(0.2);
                Dark(0.2);
                // WaveFadeIn(3.0);
                ShowImg();
                // setTimeout( FadeInImg, 1000)
            } else {
                setTimeout( FadeInImg, 1000)
            }
            setTimeout( () => {
                window.scroll(0,0);
                window.html.classList.remove("is_disabled");
            }, 1000);
        } else {

            if( location.search && location.search.split("img=")[1] ) {
                setTimeout( () => {
                    window.html.classList.remove("is_disabled");
                    Dark(0.2);
                    // Wave(3.0);
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
            <div id="post">

                <div>
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                    post<br />post<br />post<br />post<br />post<br />
                </div>

                <footer id="footer">
                    <p className="address">©Copyrights dsflon. Allrights reserved.</p>
                </footer>

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
