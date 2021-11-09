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
import { Grommet } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { rgba } from 'polished';
// import { ChakraProvider } from "@chakra-ui/react"

const theme = {
  global: {
    colors: {
      'light-2': '#f5f5f5',
      'text': {
        'light': 'rgba(0, 0, 0, 0.87)',
      },
      'primary': '#303f9f',
    },
    edgeSize: {
      small: '14px',
    },
    elevation: {
      light: {
        medium: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      },
    },
    font: {
      size: '14px',
      height: '20px',
    },
  },
 button: {
   border: {
     width: '1px',
    radius: '4px',
   },
   padding: {
    vertical: '8px',
     horizontal: '16px',
   },
   extend: props => `
     text-transform: uppercase;
     font-size: 0.875rem;
     font-weight: 500;
     line-height: normal;

    ${!props.primary && `
      border-color: ${rgba(normalizeColor(props.colorValue, props.theme), 0.5)};
      color: ${normalizeColor(props.colorValue, props.theme)};
      :hover {
         box-shadow: none;
         background-color: ${rgba(normalizeColor(props.colorValue, props.theme), 0.08)};
       }
     `}
   `,
 },
};



const store = createStore(rootReducer, applyMiddleware(thunk))

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <Grommet theme={theme}>
      <App/>
      </Grommet>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
