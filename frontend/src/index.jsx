import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import operators from './components/operators';
import insert from './components/insert';
import operatorCard from './components/operatorCard';
import EditOperator from './components/put';
import GetStats from './components/stats';
import statsCard from './components/statsCard';
import NotFound from './components/404';
import Login from './components/login';
import SignIn from './components/signin';
  console.log = function() {}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Switch>
        <Route path="/operator/:id" component={ operatorCard } exact />
        <Route exact path="/" component={ operators } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/signin" component={ SignIn } />
        <Route path="/new" component={ insert } exact />
        <Route path="/stats" component={ GetStats } exact />
        <Route path="/stats/:platform/:username" component={ statsCard } exact />
        <Route path="/edit/:id" component={ EditOperator } exact />
        <Route path="*" component={ NotFound } exact />
      </Switch>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
