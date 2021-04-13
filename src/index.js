/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./redux/reducers";
import App from './App';

// const authenticateUser = () => {
//   return {
//     type: "LOG_IN"
//   }
// }

// store.dispatch(authenticateUser());
// store.dispatch(authenticateUser());

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
