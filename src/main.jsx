import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { default as createSagaMiddleware } from '@redux-saga/core';
import App from './App.jsx';
import catsReducer from './catState';
import catSaga from './catSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cats: catsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(catSaga);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);