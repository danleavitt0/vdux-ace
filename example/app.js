import element from 'virtex-element'
import Ace from '../src/index'

require('brace/mode/javascript')
require('brace/theme/github')

function initialState () {
  return {
    test: ''
  }
}

console.log(Ace)

function render ({props, state}) {
  console.log(props, state)
  return (
    <div>
      <Ace
        mode='javascript'
        theme='github'
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
