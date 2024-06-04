import { Link, Route, Switch } from "wouter";
import Errors from "./errors";
import Users from "./users";

export default function PageUser() {
  return (
    <>
      <nav>
        <Link to="">user</Link>
        <Link to="/error">error</Link>
        <Link to="~/error">abs</Link>
      </nav>
      <Switch>
        <Route path="/" component={Users} />
        <Route path="/error" component={Errors} />
        <Route>user not found</Route>
      </Switch>
    </>
  );
}
