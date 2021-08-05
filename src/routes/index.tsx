import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import CompanyRegister from '../pages/CompanyRegister';

import AccessLevel from '../pages/Admin/AccessLevel'
import WorkedDay from '../pages/Admin/WorkedDay'
import WorkedTime from '../pages/Admin/WorkedTime'
import Rating from '../pages/Admin/Rating'
import Code from '../pages/Admin/Code'
import Company from '../pages/Admin/Company'
import AdminDashboard from '../pages/Admin/Dashboard'
import Service from '../pages/Admin/Service'
import News from '../pages/Admin/News'
import Types from '../pages/Admin/Types'
import User from '../pages/Admin/User'
import Dashboard from '../pages/Dashboard';
import GasStation from '../pages/GasStation';
import ServiceProvider from '../pages/ServiceProvider';
import AboutUs from '../pages/AboutUs';
import CompanyConfirm from '../pages/Admin/CompanyConfirm';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} title="Login" />
        <Route path="/register" exact component={Register} title="Register" />
        <Route path="/companyRegister" exact component={CompanyRegister} title="CompanyRegister" />

        <Route path="/aboutUs" exact component={AboutUs} title="AboutUs" isPrivate />
        <Route path="/serviceProvider" exact component={ServiceProvider} title="ServiceProvider" isPrivate />
        <Route path="/gasStation" exact component={GasStation} title="GasStation" isPrivate />
        <Route path="/accessLevel" exact component={AccessLevel} title="AccessLevel" isPrivate />
        <Route path="/workedDay" exact component={WorkedDay} title="WorkedDay" isPrivate />
        <Route path="/workedTime" exact component={WorkedTime} title="WorkedTime" isPrivate />
        <Route path="/rating" exact component={Rating} title="Rating" isPrivate />
        <Route path="/code" exact component={Code} title="Code" isPrivate />
        <Route path="/companys" exact component={Company} title="Company" isPrivate />
        <Route path="/companyConfirm" exact component={CompanyConfirm} title="CompanyConfirm" isPrivate />
        <Route path="/dashboard" exact component={AdminDashboard} title="Dashboard" isPrivate />
        <Route path="/services" exact component={Service} title="Service" isPrivate />
        <Route path="/news" exact component={News} title="News" isPrivate />
        <Route path="/types" exact component={Types} title="Types" isPrivate />
        <Route path="/users" exact component={User} title="User" isPrivate />
        <Route path="/main" exact component={Dashboard} title="Main" isPrivate />
    
        {/* <Route component={NotFound} isPrivate title="NotFound" /> */}
    </Switch>
);

export default Routes;