import element from 'virtex-element'
import ace from 'brace'

let editor

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

function initEditor (props) {
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
      onLoad
  } = props

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
  editor.on('focus', onFocus)
  editor.on('blur', onBlur)
  editor.on('copy', onCopy)
  editor.on('paste', onPaste)
  editor.on('change', onChange)

  function onChange () {
    if (props.onChange && !this.silent) {
      var value = editor.getValue()
      props.onChange(value)
    }
  }

  function onFocus () {
    if (props.onFocus) {
      props.onFocus()
    }
  }

  function onBlur () {
    if (props.onBlur) {
      props.onBlur()
    }
  }

  function onCopy (text) {
    if (props.onCopy) {
      props.onCopy(text)
    }
  }

  function onPaste (text) {
    if (this.props.onPaste) {
      props.onPaste(text)
    }
  }
}

function afterMount ({props, local}) {
  props = {...defaultProps, ...props}
  setTimeout(initEditor.bind(null, props))
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
}

export default {
  render,
  afterMount
}
