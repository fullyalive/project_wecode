import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import "./styles.scss";
import asyncComponent from "components/AsyncComponent";

// const AsyncPayment = asyncComponent(() => import("components/Payment"));
const AsyncFooter = asyncComponent(() => import("components/Footer"));
const AsyncAuth = asyncComponent(() => import("components/Navigation/Auth"));
const AsyncNavigation = asyncComponent(() => import("components//Navigation"));
const AsyncMainFeed = asyncComponent(() => import("components/MainFeed"));
const AsyncLectureFeed = asyncComponent(() =>
  import("components/Cards/Lecture/LectureFeed")
);
const AsyncSupport = asyncComponent(() =>
  import("components/Support"));
// const AsyncStudyFeed = asyncComponent(() =>
//   import("components/Cards/StudyGroups/StudyFeed")
// );
// const AsyncStudyDetail = asyncComponent(() =>
//   import("components/Cards/StudyGroups/StudyDetail")
// );
const AsyncLectureDetail = asyncComponent(() =>
  import("components/Cards/Lecture/LectureDetail")
);
const AsyncBaseUser = asyncComponent(() =>
  import("components/UserForm/BaseUser")
);
const AsyncChangeUserInfo = asyncComponent(() =>
  import("components/UserForm/BaseUser/ChangeUserInfo")
);
const AsyncSearch = asyncComponent(() => import("components/Search"));
const AsyncPostFeed = asyncComponent(() => import("components/Posts/PostFeed"));
const AsyncPostPagination = asyncComponent(() =>
  import("components/Posts/PostPagination")
);
const AsyncPostDetail = asyncComponent(() =>
  import("components/Posts/PostDetail")
);
const AsyncPostEditor = asyncComponent(() =>
  import("components/Posts/PostEditor")
);
const AsyncPostModify = asyncComponent(() =>
  import("components/Posts/PostModify")
);
const AsyncPasswordReset = asyncComponent(() =>
  import("components/Navigation/Auth/PasswordResetForm")
);

const App = props => [
  <AsyncNavigation key={1} />,
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  <AsyncFooter key={3} />
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

// 유저 로그인 시 노출
const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" component={AsyncMainFeed} />
    <Route exact path="/search/:searchTerm" component={AsyncSearch} />
    <Route exact path="/lectures" component={AsyncLectureFeed} />
    <Route exact path="/lectures/:lectureId" component={AsyncLectureDetail} />
    <Route exact path="/community" component={AsyncPostFeed} />
    <Route exact path="/community/detail/:postId" component={AsyncPostDetail} />
    <Route
      exact
      path="/community/:type/:page"
      component={AsyncPostPagination}
    />
    <Route exact path="/community/write" component={AsyncPostEditor} />
    <Route exact path="/community/edit" component={AsyncPostModify} />
    <Route exact path="/support" component={AsyncSupport} />
    <Route exact path="/mypage" component={AsyncBaseUser} />
    <Route exact path="/mypage/change" component={AsyncChangeUserInfo} />
    {/* <Route exact path="/payment" component={AsyncPayment} /> */}
    <Route path="" render={() => <Redirect to="/" />} />
    {/* <Route exact path="/studygroups" component={AsyncStudyFeed} />
    <Route exact path="/studygroups/:studyId" component={AsyncStudyDetail} /> */}
  </Switch>
);

// 비로그인 유저에게도 노출
const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={AsyncMainFeed} />
    <Route exact path="/search/:searchTerm" component={AsyncSearch} />
    <Route exact path="/lectures" component={AsyncLectureFeed} />
    <Route exact path="/lectures/:lectureId" component={AsyncLectureDetail} />
    <Route exact path="/community" component={AsyncPostFeed} />
    <Route exact path="/community/detail/:postId" component={AsyncPostDetail} />
    <Route
      exact
      path="/community/:type/:page"
      component={AsyncPostPagination}
    />
    <Route exact path="/community/write" component={AsyncPostEditor} />
    <Route exact path="/community/edit" component={AsyncPostModify} />
    <Route exact path="/support" component={AsyncSupport} />
    <Route exact path="/mypage" component={AsyncBaseUser} />
    <Route exact path="/login" component={AsyncAuth} />
    <Route exact path="/login/findPassword" component={AsyncPasswordReset} />
    <Route path="" render={() => <Redirect to="/" />} />
    {/* <Route exact path="/studygroups" component={AsyncStudyFeed} />
      <Route exact path="/studygroups/:studyId" component={AsyncStudyDetail} /> */}
  </Switch>
);

export default App;
