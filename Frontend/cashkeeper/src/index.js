import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import homePageReducer from './store/reducer/homePage';
import partnerReducer from './store/reducer/partner';
import borrowReducer from './store/reducer/borrow';
import loanReducer from './store/reducer/loan';
import paymentReducer from './store/reducer/payment';

import './index.css';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    homePage: homePageReducer,
    partner: partnerReducer,
    borrow: borrowReducer,
    loan: loanReducer,
    payment: paymentReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app= (
    <Provider store={ store }>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('cashkeeper'));
