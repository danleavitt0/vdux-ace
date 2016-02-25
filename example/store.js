/**
 * Imports
 */

import events from 'redux-effects-events'
import effects from 'redux-effects'
import reducer from './reducer'
import client from 'vdux-preset-client'

/**
 * Middleware
 */

const middleware = [
  effects,
  events()
]

/**
 * Store
 */

function configureStore (initialState) {
  return client(...middleware)(reducer, initialState)
}

/**
 * Exports
 */

export default configureStore
