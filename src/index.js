// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
import React from "react";
import ReactDOM, { render } from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
// import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./components/App.jsx";
// Import createStore function from redux, we can now "store" and get our state from here
// Import Provider so we can access our store variable throughout our app.
// import configureStore from "../configureStore";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers/rootReducer';
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";

const store = createStore(rootReducer, applyMiddleware(thunk))

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};
// Please see https://auth0.github.io/auth0-react/interfaces/auth0_provider.auth0provideroptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};


document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <Auth0Provider {...providerConfig}>
        <App />
      </Auth0Provider>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
