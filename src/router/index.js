import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Order from '../page/Order.js'
import Home from '../page/Home.js'


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Order" component={Order}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;