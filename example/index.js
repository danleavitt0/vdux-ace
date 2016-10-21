
/**
 * Imports
 */

import element from 'vdux/element'
import reducer from './reducer'
import vdux from 'vdux/dom'
import ready from 'domready'
import App from './app'
import flow from 'redux-flo'

/**
 * App
 */

const {subscribe, render} = vdux({reducer, middleware: [flow()]})

ready(() => {
  subscribe((state) => {
    render(<App {...state}/>)
  })
})
