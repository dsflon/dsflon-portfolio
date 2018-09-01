import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Common functions
import Fetch from './common/_fetch';
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
            dictionary: null
        }

    }

    componentDidMount() {

        Fetch("/api/list.json", null, (json) => {
            this.setState({
                list: json.data,
                dictionary: SetDictionary(json.data)
            })
            this.StartThree(json.data)
        },(e) => {
            console.error(e)
        });

    }

    StartThree(data) {

        let imageList = [];

        for (var i = 0; i < data.length; i++) {
            let list = data[i].list;
            for (var j = 0; j < list.length; j++) {
                imageList.push(list[j].thumb)
            }
        }

        Three( this.refs.bg, imageList, (threeObj) => {
            StartThree(threeObj)
        });

    }

    render() {

        return (
            <Router>
                <div>

                    <div id="bg" ref="bg"></div>

                    <Route
                        path="/:page?/:postId?"
                        render={
                            props => <PageTransition dictionary={this.state.dictionary} list={this.state.list} {...props} />
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
