import createAction from '@f/create-action'
import {toEphemeral} from 'redux-ephemeral'
import Switch from '@f/switch'

const setHandlers = createAction('<Vdux-Ace/>: SET_HANDLERS')

export {
	setHandlers
}

export default ({dispatch, getState, actions}) => (next) => (action) => {
	if (action.type === setHandlers.type) {
		const {editor} = getState()
		editor.on('change', () => dispatch(actions.onChange()))
	}
	return next(action)
}