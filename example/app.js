/** @jsx element */

import Ace from '../src/index'
import createAction from '@f/create-action'
import vm from 'vm-browserify'

require('brace/mode/javascript')
require('brace/theme/tomorrow_night')

const saveText = createAction('SAVE_TEXT')
const runCode = createAction('RUN_CODE')
const sandbox = {}

function initialState () {
  return {
    text: '',
    evaluated: ''
  }
}

function render ({ props, state, local }) {
  return (
    <div>
      <Ace
        mode='javascript'
        theme='tomorrow_night'
        onFocus={local(saveText)}
        onChange={[local(runCode), local(saveText)]}
        {...props} />
    </div>
  )
}

function reducer (state, action) {
  switch (action.type) {
    case saveText.type:
      return {
        ...state,
        text: action.payload
      }
    case runCode.type:
      return {
        ...state,
        evaluated: vm.runInNewContext(action.payload, sandbox, {
          filename: 'test'
        })
      }
  }
  return state
}

// const reducer = combineReducers({
//   text: handleActions({
//     [saveText]: (state, code) => code
//   }),
//   evaluated: handleActions({
//     [runCode]: (state, code) => vm.runInThisContext(code, {filename: 'test'})
//   })
// })

export default {
  initialState,
  render,
  reducer
}
