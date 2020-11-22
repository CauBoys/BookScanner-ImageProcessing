import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider as StoreProvider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './modules/index'

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
