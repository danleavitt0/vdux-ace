/**
 * Imports
 */

import events from 'redux-effects-events'
import effects from 'redux-effects'
import logger from 'redux-logger'
import reducer from './reducer'
import client from 'vdux-client'

/**
 * Middleware
 */

const middleware = [
  effects,
  events(),
  logger()
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
