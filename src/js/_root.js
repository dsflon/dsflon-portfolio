import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Common functions
import Fetch from './common/_fetch';

import Home from './views/home'
import Post from './views/post'

import Three from './views/_set_three'
import { StartThree } from './views/three'


// const GetPages = (props) => {
class GetPages extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            match: { url, params: { page,postId } }
        } = this.props;

        switch (page) {

            case 'post':
            return <Post props={this.props} postId={postId} />

            default:
            return <Home props={this.props} />

        }
    }

}

class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: null
        }

    }

    componentDidMount() {

        Fetch("/api/list.json", null, (json) => {
            this.setState({
                list: json.data
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
                        render={props => <GetPages list={this.state.list} {...props} />} />

                    <footer id="footer">
                        <p className="address">©Copyrights dsflon. Allrights reserved.</p>
                    </footer>

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