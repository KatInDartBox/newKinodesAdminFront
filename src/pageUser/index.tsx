import { Route, Switch } from "wouter";
import Ads from "./ads/lists";
import Errors from "./errors/lists";
import Layout from "./layout";
import Users from "./users";
import Visitors from "./visitors/lists";

export default function PageUser() {
  return (
    <div className="flex">
      <Layout />
      <Switch>
        <Route path="/" component={Users} />
        <Route path="/ads" component={Ads} />
        <Route path="/error" component={Errors} />
        <Route path="/visitor" component={Visitors} />
        <Route>user not found</Route>
      </Switch>
    </div>
  );
}
