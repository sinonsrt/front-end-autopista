import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ExampleForm from '../pages/ExampleForm';

import AccessLevel from '../pages/Admin/AccessLevel'
import Company from '../pages/Admin/Company'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} title="Login" isPrivate />
        <Route path="/AccessLevel" exact component={AccessLevel} title="AccessLevel" isPrivate />
        <Route path="/Company" exact component={Company} title="Company" isPrivate />
        <Route path="/register" exact component={Register} title="Register" isPrivate />
        <Route path="/ExampleForm" exact component={ExampleForm} title="ExampleForm" />

        {/* <Route component={NotFound} isPrivate title="NotFound" /> */}
    </Switch>
);

export default Routes;