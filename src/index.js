/** @jsx element */

import element from 'vdux/element'
import ace from 'brace'

let editor
let lastNum

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
      jsOptions,
      showPrintMargin,
      keyboardHandler,
      onLoad,
      autocomplete
  } = props

  let element = document.getElementById(name)
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
  editor.session.$worker.call('setOptions', [jsOptions])
  editor.setOption('enableLiveAutocompletion', autocomplete)
  editor.setShowPrintMargin(showPrintMargin)
  editor.on('change', () => element.click())
  editor.on('focus', () => element.focus())
  editor.on('blur', () => element.blur())
  editor.on('copy', (text) => {
    let evt = new window.Event('copy', {'bubbles': true, 'cancelable': false})
    return element.dispatchEvent(evt, text)
  })
  editor.on('paste', () => {
    let evt = new window.Event('paste', {'bubbles': true, 'cancelable': false})
    return element.dispatchEvent(evt)
  })
}

function onCreate ({props, local}) {
  props = {...defaultProps, ...props}
  setTimeout(initEditor.bind(null, props))
}

function trace (lineNum) {
  if (lastNum) {
    editor.getSession().removeMarker(lastNum.id)
  }
  if (lineNum >= 0) {
    lastNum = editor.getSession().highlightLines(lineNum)
  } else {
    lastNum = null
  }
}

function render ({props, state, local}) {
  props = {...defaultProps, ...props}
  const {activeLine} = props

  if (editor) {
    trace(activeLine)
  }

  var divStyle = {
    width: props.width,
    height: props.height
  }
  var className = props.className
  return (
    <div
      id={props.name}
      className={className}
      style={divStyle}
      onFocus={onFocus}
      onClick={onChange}
      onCopy={onCopy}
      onBlur={onBlur}
      onPaste={onPaste} />
  )

  function onFocus () {
    if (props.onFocus) {
      return props.onFocus()
    }
  }

  function onBlur () {
    if (props.onBlur) {
      return props.onBlur()
    }
  }

  // this.silent
  function onChange () {
    if (props.onChange) {
      var changeHandlers = [...props.onChange]
      var value = editor.getValue()
      return changeHandlers.map((f) => f(value))
    }
  }

  function onCopy (text) {
    if (props.onCopy) {
      return props.onCopy(text)
    }
  }

  function onPaste (text) {
    if (props.onPaste) {
      props.onPaste(text)
    }
  }
}

export default {
  render,
  onCreate
}
