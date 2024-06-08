import { Route, Switch } from "wouter";
import Errors from "./errors";
import Layout from "./layout";
import Users from "./users";

export default function PageUser() {
  return (
    <div className="flex">
      <Layout />
      <Switch>
        <Route path="/" component={Users} />
        <Route path="/error" component={Errors} />
        <Route>user not found</Route>
      </Switch>
    </div>
  );
}
