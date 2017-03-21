/** @jsx element */

import mw, {setValue as setNewValue, setHandlers} from './middleware'
import {component, element} from 'vdux'
import ace from 'brace'

const defaultProps = {
  name: 'brace-editor',
  mode: 'javascript',
  theme: 'monokai',
  height: '500px',
  width: '500px',
  value: '',
  fontSize: 12,
  showGutter: true,
  onChange: null,
  onPaste: null,
  onLoad: null,
  maxLines: null,
  readOnly: false,
  highlightActiveLine: true,
  showPrintMargin: true,
  tabSize: 2,
  cursorStart: 1,
  editorProps: {},
  wrapEnabled: false
}

export {
  mw
}

const Component = component({
  initialState: {
    ready: false,
    editor: null
  },
  * afterRender ({props, actions, state}) {
    if (!state.ready) {
      yield actions.initEditor()
    }
  },
  * onUpdate (prev, {state, props, actions}) {
    if (state.ready && prev.props.activeLine !== props.activeLine) {
      yield actions.trace(props.activeLine)
    }
  },
  render ({props, state, actions}) {
    const mergeProps = {...defaultProps, ...props}
    const {onFocus, onCopy, onBlur, onPaste} = mergeProps
    const {activeLine} = props
    const {ready} = state

    if (ready && props.ref) {
      props.ref(actions)
    }

    const divStyle = {
      width: props.width,
      height: props.height
    }

    return (
      <div
        id={props.name}
        className={props.className}
        style={divStyle}
        onFocus={onFocus}
        onCopy={onCopy}
        onBlur={onBlur}
        onPaste={onPaste} />
    )
  },
  controller: {
    * onChange ({props, state}) {
      yield props.onChange(state.editor.getValue())
    },
    * initEditor ({actions, props, path}, node) {
      yield actions.setEditor(init({...defaultProps, ...props}))
      yield setHandlers({path, reducer: Component.reducer})
      yield actions.setReady()
    },
    * setValue ({state}, val) {
      yield state.editor.setValue(val)
    },
    * trace ({props, state, actions}, line) {
      if (state.marker) {
        yield state.editor.getSession().removeMarker(state.marker.id)
      }
      if (line >= 0) {
        yield actions.setMarker(state.editor.getSession().highlightLines(line))
      } else {
        yield actions.setMarker(null)
      }
    }
  },
  reducer: {
    setEditor: (state, editor) => ({editor}),
    setMarker: (state, marker) => ({marker}),
    setReady: () => ({ready: true}),
  },
  middleware: [mw]
})

function init (props) {
  const {
      name,
      onBeforeLoad,
      mode,
      theme,
      fontSize,
      value,
      cursorStart,
      showGutter,
      wrapEnabled,
      maxLines,
      readOnly,
      highlightActiveLine,
      tabSize,
      jsOptions = {},
      showPrintMargin,
      keyboardHandler,
      onLoad,
      autocomplete = false
  } = props

  const editor = ace.edit(name)
  editor.getSession().setMode(`ace/mode/${mode}`)
  editor.setTheme(`ace/theme/${theme}`)
  editor.setFontSize(fontSize)
  editor.setValue(value, cursorStart)
  editor.renderer.setShowGutter(showGutter)
  editor.getSession().setUseWrapMode(wrapEnabled)
  editor.setOption('maxLines', maxLines)
  editor.setOption('readOnly', readOnly)
  editor.$blockScrolling = Infinity
  editor.setOption('highlightActiveLine', highlightActiveLine)
  editor.setOption('tabSize', tabSize)
  editor.session.$worker.call('setOptions', [jsOptions])
  editor.setOption('enableLiveAutocompletion', autocomplete)
  editor.setShowPrintMargin(showPrintMargin)
  return editor
}

console.log(Component)

export default Component