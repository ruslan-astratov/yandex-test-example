import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store/configureStore'

import "./index.css"

import  App  from './App'

const rootEl = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>
  , rootEl
)
