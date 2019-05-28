import React, { lazy, FC, Suspense } from "react";
import { Router, Switch, Route } from "react-router";
import { history } from "./history";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const WaterChart = lazy(() => import("../pages/WaterChart"));

const RouterConfig: FC = () => {
  return (
    <Router history={history}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/highPosition/:type/:id" component={WaterChart} />
          <Route path="/waterLogging/:type/:id" component={WaterChart} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default RouterConfig;