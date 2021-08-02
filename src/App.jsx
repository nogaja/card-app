import logo from './logo.svg';
import './assets/styles/main.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import React, { Component } from 'react';
import { Header } from './cmps/Header';
export function App() {
  return (
    <section>
      <Router>
      <Header/>
        <Switch>
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path}></Route>)}
        </Switch>
      </Router>
    </section>
  );
}

export default App;
