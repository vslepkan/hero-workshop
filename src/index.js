import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App, { Battle, HeroPage } from './App';
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/heroes" component={App} />
      <Route exact path="/heroes/battle" component={Battle} />
      <Route path="/heroes/:id" component={HeroPage} />

      <Redirect from='/' to='/heroes' />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
