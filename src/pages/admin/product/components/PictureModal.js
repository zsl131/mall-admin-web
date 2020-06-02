import React from 'react';
import { message, Modal } from 'antd';
import { httpGet } from '@/utils/normalService';
import PictureWall from '@/components/common/PictureWall';
import { confirmModal } from '@/utils/common';

class PictureModal extends React.Component {

  state = {
    fileList:[]
  };

  render() {
    const {
      onOk,
      item,
      picList,
      ...modalProps
    } = this.props;

    // console.log(picList);

    const handleOk = (e) => {
      e.preventDefault();
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const onBeforeUpload = (file) => {
      if(file.type.indexOf("image")<0) {
        message.error("只能上传图片格式文件");
        return false;
      }
      return true;
    };

    const onFileChange = (file) => {
      //console.log("onFileChange", file);
      if(file.status === 'done') {
        //setFieldsValue({"imgUrl": file.response});
        updateAmount("picCount", 1);
      }
      if(file.status==="removed") {
        const id = file.objId?file.objId:file.response.data[0].id;
        const obj = {id: id, apiCode: "mediumService.delete"};
        httpGet(obj); //删除
        updateAmount("picCount", -1);
      }
    };

    const onRemove = (file) => {
      return new Promise(function(resolve, reject) {
        confirmModal({
          content: "确定要删除该图片吗？",
          onOk: () => {
            resolve(true);
          },
          onCancel: () => {
            resolve(false);
          }
        });
      });
    };

    const updateAmount =(field, amount) => {
      const amountApi = "productService.plusCount";
      httpGet({apiCode: amountApi, id: item.id, amount: amount, field: field});//.then((res) => {message.success(res)});
    };

    const dataConfig = (orderNo) => {
      let config = {objClassName: "Product", objId: item.id, width: 800};
      config.orderNo=orderNo;
      return config;
    };

    const getFile = (index) => {
      const item = picList.find((item)=>item.orderNo===(index+1));
      // console.log(index, item);
      if(item) {
        return [{
          uid: item.id,
          objId: item.id,
          name: item.qiniuKey,
          status: 'done',
          url: item.rootUrl+item.qiniuKey,
        }]
      } else {return null;}
    };

    return(
      <Modal {...modalOpts} style={{"minWidth":"70%"}}>
        <div>
          <PictureWall fileList={getFile(0)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="封面图片" data={dataConfig(1)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(1)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="封面图片" data={dataConfig(2)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(2)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="封面图片" data={dataConfig(3)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(3)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="封面图片" data={dataConfig(4)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(4)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="封面图片" data={dataConfig(5)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(5)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="分享图" data={dataConfig(6)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(6)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="分享图" data={dataConfig(7)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(7)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="分享图" data={dataConfig(8)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(8)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="分享图" data={dataConfig(9)} onFileChange={onFileChange}/>
          <PictureWall fileList={getFile(9)} onBeforeUpload={onBeforeUpload} onRemove={onRemove} type="image" showMsg="分享图" data={dataConfig(10)} onFileChange={onFileChange}/>
        </div>
        <p className="dark">建议尺寸：封面图片：800x430px，分享图：宽度不低于800px，高度不低于460px</p>
        <p className="dark">封面图片：显示在详情页顶部的轮播图中，分享图：用于下载分享</p>
      </Modal>
    );
  }
}

export default PictureModal;

