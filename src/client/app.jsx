//
// This is the client side entry point for the React app.
//
import thunkMiddleware from 'redux-thunk'
import React from "react";
import { render, hydrate } from "react-dom";
import { routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { fetchData } from "./actions";
import { renderRoutes } from "react-router-config";
import firebase from "./firebase"

//
// Redux configure store with Hot Module Reload
//
const configureStore = initialState => {
  const store = createStore(
    rootReducer, 
    initialState,
    applyMiddleware(
      thunkMiddleware
      ));

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
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const ref = firebase.database().ref('users/' + user.uid)
        store.dispatch(fetchData(ref)).then(() => console.log(store.getState()))
      } 
    });

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


//firebase.push('test', {name: 'test'})