import React, { useRef, createRef, useState, useEffect } from 'react';
import CodeMirror from 'codemirror';
import PropTypes from 'prop-types';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/nord.css';

// const CodeMirrorEditor = (props: any) => {
//   const editorRef: any = createRef();
//   let editor: any = useRef();
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     editor = CodeMirror.fromTextArea(editorRef.current, props);
//     editor.on('change', handleChange);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   useEffect(() => {
//     if (!editor) return;
//     if (props.value && editor.getValue() !== props.value) {
//       editor.setValue(props.value);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.value]);
//   const handleChange = () => {
//     if (!editor) return;
//     const value = editor.getValue();
//     if (value === props.value) return;
//     if (props.onChange) {
//       props.onChange({ target: { value } });
//     }
//     if (editor.getValue() !== props.value) {
//       editor.setValue(props.value);
//     }
//   };

//   return (
//     <textarea ref={editorRef} value={props.value} onChange={props.onChange} />
//   );
// };

// export default CodeMirrorEditor;

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
