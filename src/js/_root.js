import firebase from 'firebase/app';
import 'firebase/database';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Common functions
// import Fetch from './common/_fetch';
import SetDictionary from './common/_setDictionary';

import Home from './views/home'
import Post from './views/post'

import Three from './views/_set_three'
import { StartThree } from './views/three'

const GetPages = ({props}) => {
    const {
        match: { params: { page } }
    } = props;

    switch (page) {

        case 'post':
        return <Post props={props} />

        default:
        return <Home props={props} />

    }
}

const PageTransition = (props) => {
    const {
        match: { params: { page } }
    } = props;
    // return <GetPages props={props} />
    return (
        <TransitionGroup>
            <CSSTransition
                key={page || "home"}
                timeout={2000}
                classNames={page || "home"}>
                <GetPages className="adfgaf" props={props} />
            </CSSTransition>
        </TransitionGroup>
    )

}

class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: null,
            dictionary: null,
            imageList: null
        }

    }

    componentDidMount() {

        // Fetch("/api/list.json", null, (json) => {
        //
        //     let imageList = [];
        //
        //     for (var i = 0; i < json.data.length; i++) {
        //         let list = json.data[i].list;
        //         for (var j = 0; j < list.length; j++) {
        //             imageList.push(list[j].thumb)
        //         }
        //     }
        //
        //     this.setState({
        //         list: json.data,
        //         dictionary: SetDictionary(json.data),
        //         imageList: imageList
        //     })
        //     this.SetThree(imageList)
        //
        // },(e) => {
        //     console.error(e)
        // });

        let dbData = firebase.database().ref('data');
        dbData.once('value').then( (snapshot) => {

            let data = snapshot.val();

            let imageList = [];

            for (var i = 0; i < data.length; i++) {
                let list = data[i].list;
                for (var j = 0; j < list.length; j++) {
                    imageList.push(list[j].thumb)
                }
            }

            this.setState({
                list: data,
                dictionary: SetDictionary(data),
                imageList: imageList
            })
            this.SetThree(imageList)

        }).catch( (e) => {
            console.error(e);
        });


    }

    SetThree(imageList) {

        Three( this.refs.bg, imageList, (threeObj) => {

            StartThree(threeObj, () => {
                setTimeout( () => {
                    this.refs.loading_bg.style.opacity = 0;
                    this.refs.loading_bg.style.pointerEvents = "none";
                }, 1000);
        	} , (i,textures) => {
        		this.refs.loading.innerHTML = Math.floor(i / textures.length * 100) + "%"
            })

        });

    }

    render() {

        return (
            <Router>
                <div>

                    <div id="bg" ref="bg"></div>
                    <div id="loading-bg" ref="loading_bg">
                        <span id="loading" ref="loading">0%</span>
                    </div>

                    <Route
                        path="/:page?/:postId?"
                        render={
                            props => <PageTransition dictionary={this.state.dictionary} list={this.state.list} imageList={this.state.imageList} {...props} />
                    } />

                </div>
            </Router>
        )
    }

}

// const Root = () => (
//     <Router>
//         <div id="container">
//             <Route exact path="/" component={Home} />
//             {/*<Route exact path="/:rental?" component={Home} />*/}
//             <Route path="/signup" component={SignUp} />
//             <Route path="/signin" component={SignIn} />
//         </div>
//     </Router>
// )

export default Root;
