// https://www.cnblogs.com/uimeigui/p/13716917.html
// https://www.cnblogs.com/katydids/p/12676111.html
// http://t.zoukankan.com/katydids-p-12676111.html
import React, { useState, createRef } from 'react';
import { message, Alert, Button, Space, Modal, Image, Divider } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

import { upload } from '../../api/upload';
const Richtext = () => {
  let editorRef: any = createRef();
  const [imgSrc, setImgSrc] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [defaultContent, setDefaultContent] = useState<string>('默认');
  const onInit = (content, editor) => {
    console.log('content', content);
    editorRef = editor;
  };
  const handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  };
  const handleEditorBlur: any = (e: any) => {
    setDefaultContent(e.target.getContent());
  };
  // 获取编辑器中的值
  const getEditorContent = () => {
    console.log(editorRef);
    console.log(defaultContent);
  };
  // 使用 setContent 为编辑器赋值
  // const setEditorContent = () => {
  //   editorRef.setContent('');
  // };
  // 向编辑器插入内容
  // const insertContent = (content) => {
  //   editorRef.insertContent(content);
  // };
  // 上传图片
  const uploadImgHandler = async (
    biobInfo: any,
    success: any,
    failure: any
  ) => {
    const param = new FormData();
    param.append('img', biobInfo.blob());
    const res = await upload(param);
    if (res.code === 1) {
      message.success(res.message);
      success(res.result.path);
    } else {
      message.error(res.message);
      failure(res.message);
    }
  };
  //上传视频
  const uploadVideoHandler = async (cb: any, value: any, meta: any) => {
    //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
    if (meta.filetype === 'media') {
      //创建一个隐藏的type=file的文件选择input
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.onchange = async function () {
        const self: any = input;
        const file = self.files[0];
        const formData = new FormData();
        //假设接口接收参数为file,值为选中的文件
        formData.append('video', file);
        //正式使用将下面被注释的内容恢复
        const res = await upload(formData);
        if (res.code === 1) {
          message.success(res.message);
          cb(res.result.path);
        } else {
          message.error(res.message);
        }
      };
      //触发点击
      input.click();
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
    setImgSrc('');
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleImg = (e) => {
    if (e.target.tagName === 'IMG') {
      setImgSrc(e.target.src);
    }
  };
  return (
    <>
      <Alert
        message={
          <span>
            更多请查看{' '}
            <a
              href="https://github.com/tinymce/"
              target="_blank"
              rel="noopener noreferrer"
            >
              tinymce
            </a>{' '}
          </span>
        }
        type="warning"
        style={{ marginBottom: 20 }}
      />
      <Space style={{ marginBottom: 20 }}>
        <Button type="default" onClick={getEditorContent}>
          在 console 预览打印 HTML 内容
        </Button>
        <Button type="primary" onClick={showModal}>
          在 Model 预览编辑器内容
        </Button>
      </Space>
      <Editor
        // 可以将 tinymce 放在 public 优化加载
        // tinymceScriptSrc={'/tinymce/js/tinymce/tinymce.min.js'}
        id="tinymceEditor"
        apiKey="1mzihhkagqi7hfyer8oa2bvah07z4bvju36keh7e9cvxr79r"
        initialValue={defaultContent}
        init={{
          language: 'zh_CN',
          min_height: 200,
          height: 500,
          width: '100%',
          resize: true,
          default_link_target: '_blank',
          paste_enable_default_filters: true,
          // 插件配置
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount',
            'table image lists link paste'
          ],
          // 菜单配置
          menubar: 'file edit view insert format',
          // 工具栏配置
          toolbar:
            // eslint-disable-next-line no-multi-str
            'undo redo | formatselect | styleselect | bold italic | \
              alignleft aligncenter alignright alignjustify | \
              outdent indent | blockquote | table | image media link | \
              forecolor backcolor | bullist numlist | removeformat | help',
          relative_urls: false,
          content_css: ['/codepen.min.css'],
          images_upload_url: `${process.env.REACT_APP_BASE_URL}/upload`,
          images_upload_base_path: `${process.env.REACT_APP_BASE_URL}/upload`,
          images_upload_handler: uploadImgHandler,
          file_picker_types: 'media',
          video_template_callback: function (data, videoTemplateCallback) {
            return `<span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src='${data.source}' data-mce-p-width='${data.width}' data-mce-p-height='${data.height}' data-mce-p-controls="controls" data-mce-html="%20"> <video width='${data.width}' height='${data.height}' controls="controls" controlslist="nodownload" oncontextmenu="return false"> <source src='${data.source}' type='${data.sourcemime}'></source> </video> </span>`;
          },
          images_upload_credentials: true,
          convert_urls: false, //这个参数加上去就可以了
          file_picker_callback: uploadVideoHandler
        }}
        onInit={onInit}
        onChange={handleEditorChange}
        onBlur={handleEditorBlur}
      />
      <Modal
        title="预览编辑器内容"
        width={600}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {!!imgSrc && <Image width={200} src={imgSrc} />}
        <Divider>点击 html 图片，将会在上面生成图片，点击图片放大</Divider>
        <div
          style={{ width: '100%' }}
          onClick={handleImg}
          dangerouslySetInnerHTML={{ __html: defaultContent }}
        />
      </Modal>
    </>
  );
};

export default Richtext;
