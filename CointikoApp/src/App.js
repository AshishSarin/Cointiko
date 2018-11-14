import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk';
import { AppStack } from './navigation';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'





const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['posts']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export default class App extends Component {
  render() {
    let store = createStore(persistedReducer, applyMiddleware(ReduxThunk))
    let persistor = persistStore(store)
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppStack />
        </PersistGate>
      </Provider>
    );
  }
}