/** @jsx element */

import mw, { setValue as setNewValue, setHandlers } from './middleware'
import { component, element } from 'vdux'
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

const Component = component({
  initialState: {
    ready: false,
    editor: null
  },
  * afterRender ({ props, actions, state }) {
    if (!state.ready) {
      yield actions.initEditor()
    }
  },
  * onUpdate (prev, { state, props, actions }) {
    if (state.ready && prev.props.activeLine !== props.activeLine) {
      yield actions.trace(props.activeLine)
    }
    if (
      state.ready &&
      prev.props.value !== props.value &&
      props.value !== state.editor.getValue()
    ) {
      yield actions.setValue(props.value)
    }
  },
  render ({ props, state, actions }) {
    const mergeProps = { ...defaultProps, ...props }
    const { onFocus, onCopy, onBlur, onPaste } = mergeProps
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
    * onChange ({ props, state }) {
      if (state.editor) {
        yield props.onChange(state.editor.getValue(), state.editor)
      }
    },
    * initEditor ({ actions, props, path }, node) {
      yield actions.setEditor(init({ ...defaultProps, ...props }))
      yield setHandlers({ path, reducer: Component.reducer })
      yield actions.setReady()
    },
    * onCursorChange ({ props, state }, ...args) {
      if (state.editor && props.onCursorChange) {
        yield props.onCursorChange(...args)
      }
    },
    * setValue ({ state }, val) {
      if (state.editor) {
        state.editor.setValue(val)
        state.editor.clearSelection()
      }
    },
    * scrollToLine ({ state }, val) {
      if (state.editor) {
        yield state.editor.scrollToLine(val, true, false)
      }
    },
    * trace ({ props, state, actions }, line) {
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
    setEditor: (state, editor) => ({ editor }),
    setMarker: (state, marker) => ({ marker }),
    setReady: () => ({ ready: true })
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
  editor.setShowPrintMargin(showPrintMargin)
  return editor
}

export default Component
