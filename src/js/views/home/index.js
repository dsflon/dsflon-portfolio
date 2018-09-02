import * as THREE from 'three';

import React from 'react';
import { Link, Route } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

// import { Helmet } from "react-helmet";
import { Hover, FadeOutImg, Dark, DarkFade, Wave } from '../three'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.Index = 0;
        this.imageIndex = 0;

        this.listElm = [];
        this.sectionsElm = [];
        this.clickable = false;

        this.listBlob = [];

    }

    componentDidMount() {
        this.HoverCntl()

        if( window.prevPage == "post" ) {
            window.html.classList.add("is_disabled");
            // setTimeout( () => {
                window.scroll(0,window.scrollVal);
            // }, 500);
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

        if( this.imageList[0] ) {
            for (var i = 0; i < this.imageList.length; i++) {
                this.ToBlob(i,this.imageList[i],this.imageList.length)
                this.listBlob.push("")
            }
        }
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

    ClickList(locked,e) {

        e.preventDefault();

        if( locked ) {
            alert("パスワードが必要です。")
            return false;
        }

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

    ToBlob(i,path,length) {

        let xhr = new XMLHttpRequest();
        xhr.open( "GET", path, true );
        xhr.responseType = "arraybuffer";
        xhr.onload = ( e ) => {

            let arraybuffer = e.target.response,
                blob = new Blob([arraybuffer]);

            let URL = window.URL || window.webkitURL,
                imgURL = URL.createObjectURL(blob);

            this.listBlob.splice(i, 1, imgURL);

            if( i == length - 1 ) {
                setTimeout( ()=> {
                    this.ImgReplace();
                }, 1000)
            }

            URL.revokeObjectURL(blob);
        };
        xhr.send();
    }

    ImgReplace() {

        let item = document.getElementsByClassName('list-thumb');

        for (var i = 0; i < item.length; i++) {
            item[i].style.backgroundImage = "url(" + this.listBlob[i] + ")";
        }

    }

    SetList(data) {

        let list = [];

        for (var i = 0; i < data.length; i++) {

            // this.ToBlob(this.imageIndex, data[i].thumb, data.length)

            list.push(
                <li
                    key={i}
                    style={{ "transitionDelay": 0.1 + (i*0.05) +"s" }}
                    className="list-item">
                    <a
                        id={data[i].id}
                        data-index={this.imageIndex}
                        data-locked={data[i].lock}
                        className={ "list-link" + (data[i].lock ? " is_locked" : "") }
                        ref={el => {this.listElm.push(el)}}
                        onClick={this.ClickList.bind(this,data[i].lock)}>
                        <div className="list-thumb-wrap">
                        <figure
                            className="list-thumb"
                            style={{"backgroundImage": "url(" + data[i].thumb + ")"}}>
                        </figure></div>
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

        this.list = this.props.props.list;
        this.imageList = this.props.props.imageList;
        let list = this.list ? this.SetSection(this.list) : null;

        return (

            <div id="home" className="home-enter-done">

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
