import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './views/home'

const GetPages = (props) => {

    const {
        match: { url, params: { page } }
    } = props;

    switch (page) {

        //
        // case 'signin':
        // return <SignIn props={props} />

        default:
        return <Home props={props} />

    }

}

const Root = () => (

    <Router>
        <div>
            <Route path="/:page?" component={GetPages} />

            <footer id="footer">
                <p className="address">©Copyrights dsflon. Allrights reserved.</p>
            </footer>
        </div>
    </Router>

)

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
