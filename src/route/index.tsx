import React, { lazy, FC, Suspense } from "react";
import { Router, Switch, Route } from "react-router";
import { history } from "./history";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const HighPosition = lazy(() => import("../pages/HighPosition"));
const WaterLogging = lazy(() => import("../pages/WaterLogging"));

const RouterConfig: FC = () => {
  return (
    <Router history={history}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/highPosition" component={HighPosition} />
          <Route path="/waterLogging" component={WaterLogging} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default RouterConfig;