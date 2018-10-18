import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import reducer from './reducers'

// If redux devtools is installed, use its composeEnhancers

export default (initialState = {}) => {
  const middlewares = []
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const storeEnhancers = [middlewareEnhancer]
  const composedEnhancer = composeWithDevTools(...storeEnhancers)

  const store = createStore(reducer, initialState, composedEnhancer)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () =>
        store.replaceReducer(require('./reducers').default)
      )
    }
  }
  return store
}
