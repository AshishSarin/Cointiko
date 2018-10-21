import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk';
import { AppStack } from './navigation';



export default class App extends Component {
  render() {
    const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    );
  }
}