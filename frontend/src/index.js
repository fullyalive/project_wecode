import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "redux/configureStore";
import App from "components/App";
import I18n from "redux-i18n";
import { translations } from "translations";
import Favicon from "react-favicon";

ReactDOM.render(
  <div>
    <Favicon url="https://raw.githubusercontent.com/fullyalive/project_wecode/master/frontend/src/images/wecode.ico?token=AgCSHovTlxAJVvykmNnxiz002rKcrMAMks5bl8ATwA%3D%3D" />
    <Provider store={store}>
      <I18n translations={translations} initialLang="ko" fallbackLang="en">
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </I18n>
    </Provider>
  </div>,
  document.getElementById("root")
);
