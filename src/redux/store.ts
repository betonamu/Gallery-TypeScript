import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware, {SagaMiddleware} from 'redux-saga'

import {ssrMode} from '@constants';
import rootSaga from './sagas';
import rootReducer from './reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const getMiddleWare = (sagaMiddleware: SagaMiddleware) => {
    if (process.env.NODE_ENV === 'development') {
        const composeEnhancers = ssrMode ? compose : window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        return composeEnhancers(applyMiddleware(sagaMiddleware));
    }

    return applyMiddleware(sagaMiddleware);
}

const makeStore = (initialState: any) => {
    const sagaMiddleware = createSagaMiddleware();
    const store: any = createStore(
        rootReducer,
        initialState,
        getMiddleWare(sagaMiddleware)
    );
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export const wrapper = createWrapper(makeStore, {debug: false});