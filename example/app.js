import element from 'virtex-element'
import Ace from '../src/index'
import combineReducers from '@f/combine-reducers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'

require('brace/mode/javascript')
require('brace/theme/tomorrow_night')

const saveText = createAction('SAVE_TEXT')

function initialState () {
  return {
    text: ''
  }
}

function render ({props, state, local}) {
  console.log(props, state)
  return (
    <div>
      <Ace
        mode='javascript'
        theme='tomorrow_night'
        onFocus={local(saveText)}
        onChange={local(saveText)}
        {...props} />
    </div>
  )
}

const reducer = combineReducers({
  text: handleActions({
    [saveText]: (state, code) => code
  })
})

export default {
  initialState,
  render,
  reducer
}
