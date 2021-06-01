import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';

import AccessLevel from '../pages/Admin/AccessLevel'
import Code from '../pages/Admin/Code'
import Company from '../pages/Admin/Company'
import Dashboard from '../pages/Admin/Dashboard'
import Service from '../pages/Admin/Service'
import News from '../pages/Admin/News'
import Types from '../pages/Admin/Types'
import User from '../pages/Admin/User'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} title="Login" />
        <Route path="/register" exact component={Register} title="Register" />

        <Route path="/accessLevel" exact component={AccessLevel} title="AccessLevel" isPrivate />
        <Route path="/code" exact component={Code} title="Code" isPrivate />
        <Route path="/companys" exact component={Company} title="Company" isPrivate />
        <Route path="/dashboard" exact component={Dashboard} title="Dashboard" isPrivate />
        <Route path="/services" exact component={Service} title="Service" isPrivate />
        <Route path="/news" exact component={News} title="News" isPrivate />
        <Route path="/types" exact component={Types} title="Types" isPrivate />
        <Route path="/users" exact component={User} title="User" isPrivate />
    
        {/* <Route component={NotFound} isPrivate title="NotFound" /> */}
    </Switch>
);

export default Routes;