import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Web from './routes/Web';
import 'moment/locale/id'
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Provider } from 'react-redux';
import model from './models/model';
defineCustomElements(window);

const container = document.getElementById('application')
const root = createRoot(container)

root.render(
  <Provider store={model}>
    <Web />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
