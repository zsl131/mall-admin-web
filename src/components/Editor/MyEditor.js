import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'wangeditor2';
import { password } from '@/utils/common';
import { Button } from 'antd';
import FullScreenEditor from '@/components/Editor/FullScreenEditor';

export default class MyEditor extends React.Component {

  state = {
    editor: Object,
    content: this.props.content || "",
    isFull: this.props.isFull || false,
    visible: false,
    height: this.props.height || "300px"
  };

  componentDidMount() {
    const editor = new Editor(ReactDOM.findDOMNode(this._div));

    editor.customConfig.onchange = (html) => {
      this.setState({
        content: html,
        editorText: editor.txt.text()
      });
      // console.log("onChange", html, editor);
      //将html值设为form表单的desc属性值
      /*this.props.form.setFieldsValue({
        'content': html
      });*/
      this.props.onChangeContent(html);
    };
    // console.log("editor", editor.customConfig);
    // 上传图片（举例）
    editor.customConfig.uploadImgServer = '/api/upload/normal';
    editor.customConfig.uploadFileName = 'files';
    editor.customConfig.height = "900px";

    const data = {
      isEditor: true,
      width: 500,
      objClassName: "product_editor"
    };
    const params = password(data);
    //console.log("-------->", params);
    editor.customConfig.uploadImgParams = {
      extra: params
    };
    editor.customConfig.uploadImgHeaders = {

    };
    editor.customConfig.showLinkImg = false;
    editor.customConfig.uploadImgHooks = {
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log("success", result);
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log("fail", result);
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        console.log("error", editor);
      },
    };
    editor.create();
    editor.txt.html(this.props.content);
    this.setState({editor: editor});

    //console.log(ele.style.height)

    //console.log(doc.length)
    //console.log(doc[0].innerHTML);
    this.setHeight();
  }

  setHeight() {
    const doc = ReactDOM.findDOMNode(this._div).getElementsByClassName("w-e-text-container");
    const ele = doc[0];
    //console.log(ele);
    //console.log(this.state.height)
    ele.style.height = this.state.height;
  };

  fullScreen = () => {
    this.setState({visible: true});
  };

  render() {
    const {isFull, content, visible, editor} = this.state;

    const opts = {
      visible: visible,
      onCancel: (content)=> {
        //console.log(content)
        editor.txt.html(content);
        this.setState({visible: false});
      }
    };
    return (
      <div>
        <div id="test11" ref={(ref) => this._div = ref} />
        {!isFull?<Button onClick={this.fullScreen}>全屏编辑</Button>:""}
        {visible && <FullScreenEditor {...opts} content={content}/>}
      </div>
    );
  }
}
