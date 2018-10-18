import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import 'normalize.css'
import './index.css'
import './polyfill'
import createStore from './store'

const store = createStore()

const root = document.getElementById('root')

const render = () => {
  const App = require('./components/App').default
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderError = error => {
    const RedBox = require('redbox-react')
    render(<RedBox error={error} />, root)
  }

  let renderAppOrError = () => {
    try {
      render()
    } catch (error) {
      renderError(error)
    }
  }

  module.hot.accept('./components/App', () => setTimeout(renderAppOrError))
}

render()
