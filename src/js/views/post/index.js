import * as THREE from 'three';

import React from 'react';
import { Link } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

// Common functions
import Nl2br from '../../common/_nl2br';

// import { Helmet } from "react-helmet";
import { ShowImg, FadeInImg, FadeOutImg, UpdateTextureImage, Dark, DarkFade, WaveFadeIn } from '../three'

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const {
            match: { params: { postId } }
        } = this.props.props;

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

        if( !postId ) {
            window.prevPage = null;
            this.history.replace("/")
        } else {
            window.prevPage = "post";
        }
    }
    componentWillUnmount() {
    }
    componentDidUpdate() {
        if( this.postData.lock && !this.props.props.login ) {
            window.prevPage = null;
            this.history.replace("/")
        }
    }

    SetPost(data) {

        let github = data.link.github ? <a href={data.link.github} target="_blank" className="a-btn">GitHub</a> : null;
        let view = data.link.view ? <a href={data.link.view} target="_blank" className="a-btn">View page</a> : null;

        return (

            <div className="post-inner">
                <div className="post-body">

                    <div className="post-flex">

                        <figure className="post-thumb"><img src={data.thumb} /></figure>

                        <div className="post-wrap">
                            <p className="post-date">{data.date}</p>
                            <h2 className="post-ttl">{data.title}</h2>
                            <p className="post-text">{Nl2br(data.text)}</p>
                            <p className="post-skills">{data.skills}</p>
                            <div className="post-btns a-btns">
                                {github}
                                {view}
                            </div>
                        </div>

                    </div>

                    <div className="post-back">
                        <Link to="/" className="a-btn is_back">Back</Link>
                    </div>

                </div>
            </div>

        )

    }

    render() {

        this.state = this.props.state;
        this.actions = this.props.actions;
        this.history = this.props.props.history;

        const {
            match: { params: { postId } }
        } = this.props.props;

        let postData = this.props.props.dictionary,
            postDom = null;
        if( postData && postId ) {
            this.postData = postData = postData[ postId.split("post_")[1] ];
            postDom = this.SetPost(postData);
        }

        return (
            <div id="post">

                <header id="header">
                    <h1><Link to="/">dsflon | daiki saito</Link></h1>
                </header>

                {postDom}

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
