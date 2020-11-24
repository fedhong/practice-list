import React from 'react';
import ReactDom from 'react-dom';
import App from './src/view/App/index';
import About from './src/view/App/about'
import Users from './src/view/App/users'
import store from './src/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDom.render(
    <Provider store={store}>
        <Router >
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/about" component={About} />
                <Route path="/users" component={Users} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));