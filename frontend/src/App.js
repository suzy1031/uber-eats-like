import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Restaurants } from "./containers/Restaurants";
import { Foods } from "./containers/Foods";
import { Orders } from "./containers/Orders";

function App() {
  return (
    <Router>
      <Switch>
        {/* 店舗一覧ページ */}
        <Route exact path="/restaurants">
          <Restaurants />
        </Route>
        {/* フード一覧ページ */}
        <Route exact path="/foods">
          <Foods />
        </Route>
        {/* 注文ページ */}
        <Route exact path="/orders">
          <Orders />
        </Route>
        {/* パラメータとして設定したい部分は頭に「:」をつける */}
        <Route
          exact
          path="/restaurants/:restaurantsId/foods"
          render={({ match }) => <Foods match={match} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
