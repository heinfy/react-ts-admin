import React from 'react';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/nord.css';
import 'highlight.js/scss/github.scss';

class CodeMirrorEditor extends React.Component<any, any> {
  editorRef: React.RefObject<unknown>;
  editor: any;
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.editorRef.current, this.props);
    this.editor.on('change', this.handleChange);
  }

  componentDidUpdate() {
    if (!this.editor) return;

    if (this.props.value && this.editor.getValue() !== this.props.value) {
      this.editor.setValue(this.props.value);
    }
  }

  handleChange() {
    if (!this.editor) return;

    const value = this.editor.getValue();

    if (value === this.props.value) return;

    if (this.props.onChange) {
      this.props.onChange({ target: { value } });
    }

    if (this.editor.getValue() !== this.props.value) {
      this.editor.setValue(this.props.value);
    }
  }

  render() {
    return (
      <textarea
        ref={this.editorRef as any}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default CodeMirrorEditor;
