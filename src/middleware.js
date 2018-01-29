import createAction from '@f/create-action'
import { toEphemeral } from 'redux-ephemeral'
import Switch from '@f/switch'

const localSetValue = createAction('<Vdux-Ace/>: LOCAL_SET_VALUE')
const setHandlers = createAction('<Vdux-Ace/>: SET_HANDLERS')
const setValue = createAction('<Vdux-Ace/>: SET_VALUE')

let editorPath
let reducer

export { setHandlers, setValue }

export default ({ dispatch, getState, actions }) => next => action => {
  if (action.type === setHandlers.type) {
    const { editor } = getState()
    editorPath = action.payload.path
    reducer = action.payload.reducer
    editor.on('change', () => dispatch(actions.onChange()))
    editor
      .getSession()
      .selection.on('changeCursor', (...args) =>
        dispatch(actions.onCursorChange(...args))
      )
  }
  return next(action)
}
