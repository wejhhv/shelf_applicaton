import React from "react";
import "./App.scss";
import { AppBar } from "./components/AppBar";
import { BookShelf } from "./components/BookShelf";
import { Login } from "./components/Login";
import { authContext, useAuthContext } from "./components/hooks/useAuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <authContext.Provider value={useAuthContext()}>
      <div className="App">
        <AppBar />
        <main className="main">
          <Router>
            <Switch>
              <Route exact path="/Login" component={Login} />
              <Route exact path="/" component={BookShelf} />
            </Switch>
          </Router>
        </main>
      </div>
    </authContext.Provider>
  );
}

export default App;
