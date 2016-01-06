import element from 'virtex-element'
import Ace from '../src/index'

require('brace/mode/javascript')
require('brace/theme/tomorrow_night')

function initialState () {
  return {
    test: ''
  }
}

function render ({props, state}) {
  return (
    <div>
      <Ace
        mode='javascript'
        theme='tomorrow_night'
        {...props} />
    </div>
  )
}

function reducer (state, action) {
  return state
}

export default {
  initialState,
  render,
  reducer
}
