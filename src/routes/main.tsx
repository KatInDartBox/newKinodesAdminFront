import { Route, Switch } from "wouter";
import PageHome from "../pageHome";
import PageUser from "../pageAdmin";

export default function MainRoute() {
  return (
    <>
      <main>
        <Switch>
          <Route path="/" component={PageHome} />
          <Route path="/admin" nest component={PageUser} />
          <Route>404: page not found</Route>
        </Switch>
      </main>
    </>
  );
}
