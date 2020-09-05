import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { message } from 'antd';
import { password } from '@/utils/common';

export default class BraEditor extends React.Component {

  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(this.props.content || ""),

    content: this.props.content || "",
  };

  async componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
    //const htmlContent = await fetchEditorContent()
    const htmlContent = this.state.content;
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    })
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    //const htmlContent = this.state.editorState.toHTML()
    //const result = await saveEditorContent(htmlContent)
    //console.log(htmlContent)
  };

  handleEditorChange = (editorState) => {
    //console.log(editorState)

    const rawString = editorState.toRAW()

// editorState.toRAW()方法接收一个布尔值参数，用于决定是否返回RAW JSON对象，默认是false
    //const rawJSON = editorState.toRAW(true)

// 将editorState数据转换成html字符串
    const htmlString = editorState.toHTML()
    //console.log("String::", rawString)
    //console.log("rawJSON::", rawJSON)
    //console.log("htmlString::", htmlString)
    this.setState({ editorState })
    this.props.onChangeContent({content: htmlString, raw: rawString});
  };

  render () {

    const myUploadFn = (param) => {

      const serverURL = '/api/upload/normal';
      const xhr = new XMLHttpRequest();
      let fd = new FormData();

      const data = {
        isEditor: true,
        width: 900,
        objClassName: "product_editor"
      };
      fd.append("extra", password(data));

      const successFn = (response) => {
        //console.log(xhr);
        //responseText= {"errno":0,"data":[{"id":7,"url":"https://msq-file.zslin.com/null_db08e531-0eda-44dc-b065-53976ebcbc40.jpg"}]}
        let url = '';
        const resObj = JSON.parse(xhr.responseText);
        //console.log(resObj)
        if(resObj.errno!==0) {
          message.error("上传出错");
        } else {
          url = resObj.data[0];
          //console.log(url);
          // 假设服务端直接返回文件上传后的地址
          // 上传成功后调用param.success并传入上传后的文件地址
          param.success({
            url: url,
            meta: {
              id: 'xxx', //这个值不能改，会影响前面修改函数
              title: 'xxx',
              alt: 'xxx',
              loop: true, // 指定音视频是否循环播放
              autoPlay: true, // 指定音视频是否自动播放
              controls: true, // 指定音视频是否显示控制栏
              //poster: 'http://xxx/xx.png', // 指定视频播放器的封面
            }
          })
        }
      };

      const progressFn = (event) => {
        // 上传进度发生变化时调用param.progress
        param.progress(event.loaded / event.total * 100)
      };

      const errorFn = (response) => {
        // 上传发生错误时调用param.error
        param.error({
          msg: '上传失败.'
        })
      };

      xhr.upload.addEventListener("progress", progressFn, false)
      xhr.addEventListener("load", successFn, false)
      xhr.addEventListener("error", errorFn, false)
      xhr.addEventListener("abort", errorFn, false)

      fd.append('files', param.file)
      xhr.open('POST', serverURL, true)
      xhr.send(fd)

    };
    const { editorState } = this.state;
    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          media={{uploadFn: myUploadFn}}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
        />
      </div>
    )

  }

}
