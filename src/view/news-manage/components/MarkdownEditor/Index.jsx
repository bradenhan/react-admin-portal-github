import React, { Fragment, useRef, useState } from "react";
import { Button, Modal } from "antd";
import ForEditor from "for-editor";
import MdPreview from "./MarkdownPreview";
 
/** https://github.com/kkfor/for-editor
 * @param {string} value Markdown文本内容
 * @param {() => void} onChange 更改内容方法
 * @param {boolean} readOnly 只读状态
 */

export default function MarkdownEditor({ value, onChangeContext, readOnly }) {
  const [visible, setVisible] = useState(false); // 预览弹框状态
  const mdRef = useRef(null); // 编辑器ref

  // 工具栏菜单
  const toolbar = {
    h1: true, // h1
    h2: true, // h2
    h3: true, // h3
    h4: true, // h4
    img: true, // 图片
    link: true, // 链接
    code: true, // 代码块
    // preview: true, // 预览
    expand: true, // 全屏
    /* v0.0.9 */
    undo: true, // 撤销
    redo: true, // 重做
    save: true, // 保存 
    // subfield: true, // 单双栏模式
  };

  // 上传图片
  const addImg = (_file) => {
    console.log(_file)
    mdRef.current.$img2Url(_file.name, 'file_url');
  };

  const handleChange = (value)=> { 
    onChangeContext(value)  
  }

  return (
    <div style={{position: "relative"}}>
      {readOnly ? (
        <MdPreview content={value} />
      ) : (
        <Fragment>
          <Button style={{position: "absolute",right: "44px", top: "11px"}}
            size="small" 
            onClick={() => setVisible(true)}
          >
            预览
          </Button>
          <Modal
            title="Markdown内容预览"
            width="60%"
            okText="关闭"
            open={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            cancelButtonProps={{ style: { display: "none" } }}
          >
            <MdPreview content={value} />
          </Modal>

          <ForEditor
            placeholder="请输入Markdown文本"
            height={360}
            ref={mdRef}
            lineNum={true}
            toolbar={toolbar}
            value={value}
            onChange={handleChange}
            addImg={_file => addImg(_file)}
          />
        </Fragment>
      )}
    </div>
  );
}
