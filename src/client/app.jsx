//
// This is the client side entry point for the React app.
//

import React from "react";
import { render, hydrate } from "react-dom";
import { routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { renderRoutes } from "react-router-config";
import { reactReduxFirebase } from "react-redux-firebase"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDr-s7Sb2M0EZKqnzEa7aAvdnphoyAol9s",
  authDomain: "habits-cd935.firebaseapp.com",
  databaseURL: "https://habits-cd935.firebaseio.com",
  projectId: "habits-cd935",
  storageBucket: "habits-cd935.appspot.com",
  messagingSenderId: "826281549662"
}

const rrfConfig = {
  userProfile: 'users'
}

firebase.initializeApp(firebaseConfig)

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig)
)(createStore)

//
// Redux configure store with Hot Module Reload
//
const configureStore = initialState => {
  const store = createStoreWithFirebase(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

const store = configureStore(window.__PRELOADED_STATE__);

const start = App => {
  const jsContent = document.querySelector(".js-content");
  const reactStart = window.__PRELOADED_STATE__ && jsContent.innerHTML ? hydrate : render;

  reactStart(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    jsContent
  );
};

window.webappStart = () => start(() => renderRoutes(routes));

//
// Hot Module Reload setup
//
if (module.hot) {
  module.hot.accept("./routes", () => {
    const r = require("./routes");
    start(() => renderRoutes(r.routes));
  });
}


firebase.push('test', {name: 'test'})