import { Route, Switch } from "wouter";
import NotFound from "../PageError/notFound";
import PageHome from "../pageHome";
import PageUser from "../pageUser";

export default function MainRoute() {
  return (
    <>
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
