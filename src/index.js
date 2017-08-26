import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';

import {Provider} from 'react-redux';

const logger = createLogger();
const customizedPromiseMiddleware = promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE']
});

const store = createStore(reducers, applyMiddleware(logger, ReduxThunk, customizedPromiseMiddleware));

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    rootElement
);
