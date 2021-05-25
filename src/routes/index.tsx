import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ExampleForm from '../pages/ExampleForm';
import ExampleList from '../pages/ExampleList';

import AccessLevel from '../pages/Admin/AccessLevel'
import CompanyTable from '../pages/Admin/Company/CompanyTable'
import Code from '../pages/Admin/Code'
import CodeTable from '../pages/Admin/Code/CodeTable'
import Company from '../pages/Admin/Company'
import Dashboard from '../pages/Admin/Dashboard'
import ServiceTable from '../pages/Admin/Service/ServiceTable'
import Service from '../pages/Admin/Service'
import News from '../pages/Admin/News'
import NewsTable from '../pages/Admin/News/NewsTable'
import Types from '../pages/Admin/Types'
import TypesTable from '../pages/Admin/Types/TypesTable'
import User from '../pages/Admin/User'
import UserTable from '../pages/Admin/User/UserTable'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} title="Login" isPrivate />
        <Route path="/register" exact component={Register} title="Register" isPrivate />

        <Route path="/exampleForm" exact component={ExampleForm} title="ExampleForm" />
        <Route path="/ExampleList" exact component={ExampleList} title="ExampleList" />

        <Route path="/accessLevel" exact component={AccessLevel} title="AccessLevel" isPrivate />
        <Route path="/code" exact component={Code} title="Code" isPrivate />
        <Route path="/codeTable" exact component={CodeTable} title="CodeTable" isPrivate />
        <Route path="/company" exact component={Company} title="Company" isPrivate />
        <Route path="/companyTable" exact component={CompanyTable} title="CompanyTable" isPrivate />
        <Route path="/dashboard" exact component={Dashboard} title="Dashboard" isPrivate />
        <Route path="/serviceTable" exact component={ServiceTable} title="GasService" isPrivate />
        <Route path="/service" exact component={Service} title="Service" isPrivate />
        <Route path="/news" exact component={News} title="News" isPrivate />
        <Route path="/newsTable" exact component={NewsTable} title="NewsTable" isPrivate />
        <Route path="/types" exact component={Types} title="Types" isPrivate />
        <Route path="/typesTable" exact component={TypesTable} title="TypesTable" isPrivate />
        <Route path="/user" exact component={User} title="User" isPrivate />
        <Route path="/userTable" exact component={UserTable} title="UserTable" isPrivate />

        {/* <Route component={NotFound} isPrivate title="NotFound" /> */}
    </Switch>
);

export default Routes;