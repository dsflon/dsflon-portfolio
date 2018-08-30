import * as THREE from 'three';

import React from 'react';
import { Link, Route } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

// Common functions
import Fetch from '../../common/_fetch';

// import { Helmet } from "react-helmet";
import Three from '../_three'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.Index = 0;
        this.imageIndex = 0;

        this.listElm = [];
        this.sectionsElm = [];
    }

    componentWillMount() {
    }

    componentDidMount() {
        Fetch("/api/list.json", null, (json) => {
            this.actions.List(json.data);
            this.SetImageList(json.data)
        },(e) => {
            console.error(e)
        });
    }
    componentDidUpdate() {
    }

    SetImageList(data) {

        let imageList = [];

        for (var i = 0; i < data.length; i++) {
            let list = data[i].list;
            for (var j = 0; j < list.length; j++) {
                imageList.push(list[j].thumb)
            }
        }

        Three( {
            bg: this.refs.bg,
            list: this.listElm,
            sections: this.sectionsElm
        }, imageList);

    }
    SetList(data) {

        let list = [];

        for (var i = 0; i < data.length; i++) {
            list.push(
                <li key={i} className="f-flex4_l f-flex3 f-flex12_s list-item">
                    <a
                        href="#"
                        className="list-link"
                        ref={el => {this.listElm.push(el)}}
                        data-index={this.imageIndex}>
                        <figure
                            className="list-thumb"
                            style={{"backgroundImage": "url(" + data[i].thumb + ")"}}>
                        </figure>
                        <div className="list-txts">
                            <p className="list-date">{data[i].data}</p>
                            <h3 className="list-ttl">{data[i].title}</h3>
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

                    <ul className="f-flex list" ref={el => {this.sectionsElm.push(el)}}>
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
        //
        // let {
        //     match,
        //     history,
        // } = this.props;

        let list = this.state.list ? this.SetSection(this.state.list) : null;

        return (
            <div>

                <div id="bg" ref="bg"></div>

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
