import element from 'virtex-element'
import ace from 'brace'

const defaultProps = {
  name: 'brace-editor',
  mode: 'javascript',
  theme: '',
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
  tabSize: 4,
  cursorStart: 1,
  editorProps: {},
  wrapEnabled: false
}

function afterMount ({props}) {
  var editor = ace.edit(props.name || defaultProps.name)
  editor.getSession().setMode('ace/mode/' + props.mode)
  editor.setTheme('ace/theme/' + props.theme)
  console.log(editor)
}

function render ({props, state, local}) {
  props = {...defaultProps, ...props}
  var divStyle = {
    width: props.width,
    height: props.height
  }
  var className = props.className
  console.log(props.name)
  return (
    <div id={props.name}
      className={className}
      style={divStyle}>
    </div>
  )
}

export default {
  render,
  afterMount
}
