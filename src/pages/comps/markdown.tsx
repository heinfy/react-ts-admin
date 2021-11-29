import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const Markdown = () => {
  const markdown = `<div class="note">

  Some *emphasis* and <strong>strong</strong>!
  
  </div>`;
  return (
    <div style={{ border: '2px solid red', padding: 20, textAlign: 'center' }}>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[[remarkGfm, rehypeRaw]]}
      ></ReactMarkdown>
    </div>
  );
};

export default Markdown;
