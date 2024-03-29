
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './redux/reducers';
import { BrowserRouter as Router } from 'react-router-dom';
let composeEnhancers = null;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk))
)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Router>
            <App />
        </Router>
      </GoogleOAuthProvider>
    </Provider>
);
