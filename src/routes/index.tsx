import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ExampleForm from '../pages/ExampleForm';
import ExampleList from '../pages/ExampleList';

import AccessLevel from '../pages/Admin/AccessLevel'
import Code from '../pages/Admin/Code'
import Company from '../pages/Admin/Company'
import Dashboard from '../pages/Admin/Dashboard'
import GasService from '../pages/Admin/GasService'
import News from '../pages/Admin/News'
import Service from '../pages/Admin/Service'
import Types from '../pages/Admin/Types'
import User from '../pages/Admin/User'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} title="Login" isPrivate />
        <Route path="/register" exact component={Register} title="Register" isPrivate />

        <Route path="/exampleForm" exact component={ExampleForm} title="ExampleForm" />
        <Route path="/ExampleList" exact component={ExampleList} title="ExampleList" />

        <Route path="/accessLevel" exact component={AccessLevel} title="AccessLevel" isPrivate />
        <Route path="/code" exact component={Code} title="Code" isPrivate />
        <Route path="/company" exact component={Company} title="Company" isPrivate />
        <Route path="/dashboard" exact component={Dashboard} title="Dashboard" isPrivate />
        <Route path="/gasService" exact component={GasService} title="GasService" isPrivate />
        <Route path="/news" exact component={News} title="News" isPrivate />
        <Route path="/service" exact component={Service} title="Service" isPrivate />
        <Route path="/types" exact component={Types} title="Types" isPrivate />
        <Route path="/user" exact component={User} title="User" isPrivate />

        {/* <Route component={NotFound} isPrivate title="NotFound" /> */}
    </Switch>
);

export default Routes;