import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";

import { Navigation } from "./components/Navigation/Navigation";

const HomePageView = lazy(() => import("./views/HomePageView/HomePageView"));
const SearchPageView = lazy(() =>
  import("./views/SearchPageView/SearchPageView")
);
const MovieDetailsPage = lazy(() =>
  import("./components/MovieDetailsPage/MovieDetailsPage")
);
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/">
            <HomePageView />
          </Route>

          <Route exact path="/movies">
            <SearchPageView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route path="/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
