import React, { useState } from 'react';

// import SplitPane from 'react-split-pane';
import CodeMirrorEditor from './CodeMirrorEditor';
// md 预览
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkToc from 'remark-toc';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

import './markdown.scss';

import { initialValue } from './mdText';

const Markdown = () => {
  const [value, setValue] = useState<any>(initialValue);

  const [reh, setReh] = useState<any>([
    [rehypeHighlight, { ignoreMissing: true }]
  ]);
  const [rem, setRem] = useState<any>([remarkSlug, remarkToc]);

  const onSourceChange = (evt: any) => {
    setValue(evt.target.value);
  };
  const onControlsChange = (event: any) => {
    const name: string = event.target.name;
    const checked: boolean = event.target.checked;

    if (name === 'gfm') {
      const arr: any[] = checked ? [remarkGfm] : [];
      setRem(arr.concat(remarkSlug, remarkToc));
    } else {
      const arr: any[] = checked ? [rehypeRaw] : [];
      setReh(arr.concat(rehypeHighlight));
    }
  };
  return (
    <div className="markdown">
      <div className="editor">
        <form className="controls">
          <label>
            <input name="gfm" type="checkbox" onChange={onControlsChange} /> Use{' '}
            <code>remark-gfm</code>
            <span className="show-big"> (to enable GFM)</span>
          </label>
          <label>
            <input name="raw" type="checkbox" onChange={onControlsChange} /> Use{' '}
            <code>rehype-raw</code>
            <span className="show-big"> (to enable HTML)</span>
          </label>
        </form>

        <form>
          <CodeMirrorEditor
            mode="markdown"
            theme="nord"
            value={value}
            onChange={onSourceChange}
          />
        </form>
      </div>

      <div className="result">
        <ReactMarkdown
          className="markdown-body"
          remarkPlugins={rem}
          rehypePlugins={reh}
        >
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Markdown;
