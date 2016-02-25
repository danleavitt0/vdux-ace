
/**
 * Imports
 */

import {handleOnce} from 'redux-effects-events'
import element from 'virtex-element'
import createStore from './store'
import vdux from 'vdux/dom'
import App from './app'

/**
 * Setup store
 */

const store = createStore({
  app: {}
})

/**
 * App
 */

store.dispatch(handleOnce('domready', () => {
  vdux(
    store,
    state => <App {...state} />,
    document.body
  )
}))
