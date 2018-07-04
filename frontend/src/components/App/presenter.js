import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./styles.scss";
import Footer from "components/Footer";

const App = props => [
    // Nav,
    props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
    <Footer key={3} />
];

// 유저 로그인 시 노출
const PrivateRoutes = props => (
    <Switch>
        <Route exact path="/" render={() => "login_feed"} />
        <Route exact path="/explore" render={() => "login_explore"} />
    </Switch>
)

// 비로그인 유저에게도 노출
const PublicRoutes = props => (
    <Switch>
        <Route exact path="/" render={() => "feed"} />
        <Route exact path="/explore" rende={() => "explore"} />
    </Switch>
)

export default App;
