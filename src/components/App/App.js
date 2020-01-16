import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "screens/Home/Home";
import Battle from "screens/Battle/Battle";
import HeroPage from "screens/HeroPage/HeroPage";
import s from "./App.module.css";

function App() {
  let [isOnline, setOnline] = useState(true);

  let onOnline = () => setOnline(true);
  let onOffline = () => setOnline(false);

  useEffect(() => {
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return (
    <>
      {!isOnline && <p className={s.onlineMessage}>You are offline</p>}
      <Switch>
        <Route exact path="/heroes" component={Home} />
        <Route exact path="/heroes/battle" component={Battle} />
        <Route path="/heroes/:id" component={HeroPage} />

        <Redirect from="/" to="/heroes" />
      </Switch>
    </>
  );
}

export default App;
