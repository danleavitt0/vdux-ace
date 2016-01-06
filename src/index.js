import element from 'virtex-element'
import ace from 'brace'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import combineReducers from '@f/combine-reducers'

var editor

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

function afterMount ({props, local}) {
  props = {...defaultProps, ...props}
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
      showPrintMargin,
      keyboardHandler,
      onLoad,
  } = props

  setTimeout(() => {
    editor = ace.edit(name)
    editor.getSession().setMode(`ace/mode/${mode}`)
    editor.setTheme(`ace/theme/${theme}`)
    editor.setFontSize(fontSize)
    editor.setValue(value, cursorStart)
    editor.renderer.setShowGutter(showGutter)
    editor.getSession().setUseWrapMode(wrapEnabled)
    editor.setOption('maxLines', maxLines)
    editor.setOption('readOnly', readOnly)
    editor.setOption('highlightActiveLine', highlightActiveLine)
    editor.setOption('tabSize', tabSize)
    editor.setShowPrintMargin(showPrintMargin)
  })
}

function render ({props, state, local}) {
  props = {...defaultProps, ...props}
  var divStyle = {
    width: props.width,
    height: props.height
  }
  var className = props.className
  return (
    <div
      id={props.name}
      className={className}
      style={divStyle} />
  )

  function onChange() {
    if (this.props.onChange && !this.silent) {
      var value = this.editor.getValue();
      this.props.onChange(value);
    }
  }

  function onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  function onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  function onCopy(text) {
    if (this.props.onCopy) {
      this.props.onCopy(text);
    }
  }

  function onPaste(text) {
    if (this.props.onPaste) {
      this.props.onPaste(text);
    }
  }
}

export default {
  render,
  afterMount
}
