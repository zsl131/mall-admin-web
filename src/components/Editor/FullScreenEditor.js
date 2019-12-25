import React from 'react';
import { Button, Modal } from 'antd';
import MyEditor from '@/components/Editor/MyEditor';


class FullScreenEditor extends React.Component {

  state = {
    content: this.props.content,
    height: "300px"
  };

  componentDidMount() {
    this.rebuildHeight();
  };

  rebuildHeight() {
    let height = document.documentElement.clientHeight;
    height = (height - 190)+"px";
    this.setState({height: height});
  };

  render() {
    const {height} = this.state;
    const {
      onCancel,
      ...modalProps
    } = this.props;

    const modalOpts = {
      ...modalProps,
      title: "全屏编辑模式",
      maskClosable: false,
      // closable: false,
      footer: <Button onClick={() => {
        onCancel(this.state.content)
      }}>退出全屏</Button>,
      onCancel: ()=> {
        onCancel(this.state.content)
      }
    };
    const handleChangeContent = (html) => {
      this.setState({content: html});
     // console.log("add===", html);
      //setFieldsValue({"content": html});
    };

    return(
      <Modal {...modalOpts} style={{"minWidth":"100%", "top":"0px", "height":"100vh"}} >
        <MyEditor onChangeContent={handleChangeContent}  height={height} isFull={true} content={this.state.content}/>
      </Modal>
    );
  }
}

export default FullScreenEditor;

