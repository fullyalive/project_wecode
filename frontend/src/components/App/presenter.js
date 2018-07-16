import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import "./styles.scss";
import Footer from "components/Footer";
import Auth from "components/Auth";
import Navigation from "components/Navigation";
import MainFeed from "components/MainFeed";
import LectureFeed from "components/LectureFeed";
import StudyCard from "components/StudyCard";
const App = props => [
  <Navigation key={1} />,
  // props.isLoggedIn ? <Navigation key={1} /> : null, 로그인 여부에 따라 내비 노출시
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  <Footer key={3} />
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

// 유저 로그인 시 노출
const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" component={MainFeed} />
    <Route exact path="/lectures" component={LectureFeed} />
    <Route exact path="/studygroups" component={StudyCard} />
    <Route exact path="/community" render={() => "login_community"} />
    <Route exact path="/login" render={() => "My_page"} />
  </Switch>
);

// 비로그인 유저에게도 노출
const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={MainFeed} />
    <Route exact path="/lectures" component={LectureFeed} />
    <Route exact path="/studygroups" component={StudyCard} />
    <Route exact path="/community" render={() => "visitor_community"} />
    <Route exact path="/login" component={Auth} />
  </Switch>
);

export default withRouter(App);
