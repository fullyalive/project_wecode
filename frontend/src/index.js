import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "redux/configureStore";
// import { userContext } from "redux/configureStore";
import App from "components/App";
import I18n from "redux-i18n";
import { translations } from "translations";
import { UserProvider } from "redux/modules/userContext";

ReactDOM.render(
  <Provider store={store}>
    <UserProvider>
      <I18n translations={translations} initialLang="ko" fallbackLang="en">
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </I18n>
    </UserProvider>
  </Provider>,
  document.getElementById("root")
);
