import { Link, Route, Switch } from "wouter";
import NotFound from "../PageError/notFound";
import PageHome from "../pageHome";
import PageUser from "../pageUser";

export default function MainRoute() {
  return (
    <>
      <nav>
        <Link to="/">home</Link>
        <Link to="/user">user</Link>
      </nav>
      <main>
        <Switch>
          <Route path="/" component={PageHome} />
          <Route path="/user" nest component={PageUser} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  );
}
