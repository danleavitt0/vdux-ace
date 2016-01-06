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

function render ({props, state, local, key, ...model}) {
  console.log(props, state, model)
  return (
    <div>
      <Ace
        mode='javascript'
        theme='tomorrow_night'
        onChange={saveText}
        {...props} />
    </div>
  )
}

// function handleChange (code) {
//   return {
//     type: 'CHANGE',
//     payload: code
//   }
// }

// const reducer = combineReducers({
//   text: handleActions({
//     [saveText]: (state, code) => code
//   })
// })

function reducer (state, action) {
  switch (action.type) {
    case 'SAVE_TEXT':
      console.log(action.payload)
      return {
        ...state,
        text: action.payload
      }
  }
}

export default {
  initialState,
  reducer,
  render
}
