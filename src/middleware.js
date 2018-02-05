import createAction from '@f/create-action'

const setHandlers = createAction('<Vdux-Ace/>: SET_HANDLERS')
const setValue = createAction('<Vdux-Ace/>: SET_VALUE')

export { setHandlers, setValue }

export default ({ dispatch, getState, actions }) => next => action => {
  if (action.type === setHandlers.type) {
    const { editor } = getState()
    editor.on('change', () => dispatch(actions.onChange()))
    editor
      .getSession()
      .selection.on('changeCursor', (...args) =>
        dispatch(actions.onCursorChange(...args))
      )
  }
  return next(action)
}
