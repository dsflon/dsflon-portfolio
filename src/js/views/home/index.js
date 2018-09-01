import * as THREE from 'three';

import React from 'react';
import { Link, Route } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';


// import { Helmet } from "react-helmet";
// import Three from '../_set_three'
import { Hover, FadeOutImg, Dark, DarkFade, Wave } from '../three'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.Index = 0;
        this.imageIndex = 0;

        this.listElm = [];
        this.sectionsElm = [];
        this.clickable = false
    }

    componentDidMount() {
        this.HoverCntl()

        if( window.prevPage == "post" ) {
            window.html.classList.add("is_disabled");
            setTimeout( () => {
                window.scroll(0,window.scrollVal);
            }, 500);
            FadeOutImg( () => {
                // Wave(0.8);
                Dark(1.0)
                window.html.classList.remove("is_disabled");
            })
        }

        window.prevPage = "home";
    }
    componentDidUpdate() {
        this.HoverCntl()
    }

    HoverCntl() {
        if( window.ua.isSp ) return false;
        Hover(
            this.listElm,
            this.sectionsElm,
            () => { this.clickable = true; },
            () => { this.clickable = false; }
        )
    }

    ClickList(e) {

        e.preventDefault();

        if( !window.ua.isSp && !this.clickable ) return false;
        window.html.classList.add("is_disabled");

        let target = e.currentTarget,
            index = target.dataset.index;

        target.onmouseout = null;

        // if( !window.ua.isSp ){
        //     FadeOutImg( () => {
        //         this.history.push("/post/post_"+target.id+"?img="+index);
        //     })
        // } else {
        //     this.history.push("/post/post_"+target.id+"?img="+index);
        // }
        if( !window.ua.isSp ) DarkFade(0.2);
        this.history.push("/post/post_"+target.id+"?img="+index);
        window.scrollVal = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    }

    SetList(data) {

        let list = [];

        for (var i = 0; i < data.length; i++) {
            list.push(
                <li key={i} className="list-item">
                    <a
                        id={data[i].id}
                        data-index={this.imageIndex}
                        className={ "list-link " + (data[i].lock ? "is_lock" : "") }
                        ref={el => {this.listElm.push(el)}}
                        onClick={this.ClickList.bind(this)}>
                        <figure
                            className="list-thumb"
                            style={{"backgroundImage": "url(" + data[i].thumb + ")"}}>
                        </figure>
                        <div className="list-txts">
                            <p className="list-date">{data[i].date}</p>
                            <h3 className="list-ttl">
                                { data[i].lock ? "***" : data[i].title }
                            </h3>
                            <p className="list-skills">{data[i].skills}</p>
                        </div>
                    </a>
                </li>
            )

            this.imageIndex ++;
        }

        return list;

    }

    SetSection(data) {

        let sections = [];

        for (var i = 0; i < data.length; i++) {
            sections.push(
                <section key={i} ref={el => {this.sectionsElm.push(el)}}>

                    <h2 className="a-ttl">{data[i].title}</h2>

                    <ul className="list" ref={el => {this.sectionsElm.push(el)}}>
                        { this.SetList(data[i].list) }
                    </ul>

                </section>
            )
        }

        return sections;

    }

    render() {

        this.state = this.props.state;
        this.actions = this.props.actions;
        this.history = this.props.props.history;

        let list = this.props.props.list;
            list = list ? this.SetSection(list) : null;

        return (

            <div id="home">

                <div id="hero">
                    <div className="hero-inner">
                        <figure className="hero-img"><img src="/assets/images/logo.svg" alt="dsflon | daiki saito" /></figure>
                        <h1 className="hero-ttl">dsflon | daiki saito</h1>
                        <ul className="hero-links">
                            <li><a href="#"><img src="/assets/images/github-logo.svg" alt="github" /></a></li>
                            <li><a href="#"><img src="/assets/images/mail.svg" alt="mail" /></a></li>
                        </ul>
                    </div>
                </div>

                <div id="contents">
                    {list}
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

const Home = connect(
    MapStateToProps,
    MapDispatchToProps
)(App);

export default Home;
