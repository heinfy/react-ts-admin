import React, { useMemo, useState } from 'react';

// md 编辑器
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';

const Markdown = () => {
  // 跟踪编辑器中 value 的值.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ]);
  // 创建一个不会在渲染中变化的 Slate 编辑器对象。
  const editor = useMemo(() => withReact<any>(createEditor()), []);
  return (
    <div style={{ border: '2px solid red', padding: 20 }}>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
      >
        <Editable />
      </Slate>
    </div>
  );
};

export default Markdown;

// const Markdown = () => {
//   const markdown = `<div class="note">
//   Some *emphasis* and <strong>strong</strong>!
//   <img src="https://octodex.github.com/images/minion.png" alt="image-20211129101037662" style="zoom:50%;" />
//   ![Minion](https://octodex.github.com/images/minion.png)
//   </div>`;
//   return (
//     <div style={{ border: '2px solid red', padding: 20, textAlign: 'center' }}>
//       <ReactMarkdown
//         children={markdown}
//         remarkPlugins={[[remarkGfm]]}
//         rehypePlugins={[[rehypeRaw]]}
//         skipHtml={true}
//         sourcePos={true}
//       ></ReactMarkdown>
//     </div>
//   );
// };

// export default Markdown;
