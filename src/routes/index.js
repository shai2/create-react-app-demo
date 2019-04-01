import React, { Component } from 'react'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import RouteEntry from './routeEntry'
import RouteConfig from './routeConfig'


const RouteCTrl = route => {
  window.document.title = route.title
  return (
    <Route
      exact
      path={route.path}
      component={route.component}
    />
  )
}
const routes = (
  <RouteEntry key={Math.random()}>
    <HashRouter key={Math.random()}>
      <Switch>
        <Redirect exact from={ '/' } to="/home" />
        {
          RouteConfig.map(route => (<RouteCTrl {...route} key={Math.random()} />))
        }
      </Switch>
    </HashRouter>
  </RouteEntry>
)


export default routes
