import React from 'react';
import { Button, Pagination, Popconfirm, Table, Tag, Tooltip } from 'antd';
import ListOperator from '@/components/ListOperator';
import IconText from '@/components/common/IconText';
import ListSpecs from '@/pages/admin/product/components/ListSpecs';

const List = ({
  onDelConfirm,
  onUpdate,
  item,
  onPageChange,
  totalElement,
  onShowSpecs,
  specsVisible,
  specsList,
  modifyState,
  saveSpecs,
  deleteSpecs,
  modifyStatus,
  showVideo,
  showPic,
  modifySaleMode,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: "媒介",
    render: (record)=> {
      return (<div>
        <p>
          <Tooltip title="图片数，点击查看">
              <Button type="default" onClick={()=>showPic(record)} icon="picture">&nbsp;&nbsp;{record.picCount}</Button>
          </Tooltip>
        </p>
        <p><Tooltip title="视频"><Button onClick={()=>showVideo(record)} icon="play-square">{record.videoCount>0?"已传":"未传"}</Button></Tooltip></p>
      </div>);
    }
  }, {
    title: '产品名称',
    // dataIndex: 'title'
    render:(record)=> {
      return (
        <div>
          <p>
            <Tooltip title={record.saleMode==='1'?"当季销售":(record.saleMode==='2'?"预售":"其他")}>
              <Popconfirm title={`设置销售模式为【${record.saleMode==='1'?"预售":"当季"}】`} onConfirm={()=>modifySaleMode({id:record.id, mode:record.saleMode==='1'?"2":"1"})}>
                <Button type={record.saleMode==='1'?"primary":"danger"} shape="circle">{record.saleMode==='1'?"季":(record.saleMode==='2'?"预":"他")}</Button>
              </Popconfirm>
            </Tooltip>
            <b>{record.title}</b></p>
          <p>基金：<b className="red">￥{record.fund}</b></p>
        </div>
      );
    }
  }, {
    title: "归属",
    render: (record) => {
      return (
        <div>
        <p>{record.pcateName}-{record.cateName}</p>
        <p>{`${record.provinceName}${record.cityName}${record.countyName}`}</p>
        </div>
      )
    }
  }, {
    title: "次数",
    render: (record) => {
      return (
        <div>
          <p>
            <Tooltip title="阅读次数"><Tag color="orange"><IconText type="eye" text={record.readCount}/></Tag></Tooltip>
            <Tooltip title="评论次数"><Tag color="blue"><IconText type="message" text={record.replyCount}/></Tag></Tooltip>
            <Tooltip title="库存数"><Tag color="gold"><IconText type="container" text={record.surplusCount}/></Tag></Tooltip>
          </p>
          <p>
            <Tooltip title="规格数"><Tag color="green"><IconText type="funnel-plot" text={record.specsCount}/></Tag></Tooltip>
            <Tooltip title="收藏数"><Tag color="purple"><IconText type="star" text={record.favoriteCount}/></Tag></Tooltip>
            <Tooltip title="销量"><Tag color="red"><IconText type="shopping-cart" text={record.saleCount}/></Tag></Tooltip>
          </p>
        </div>
      );
    }
  }, {
    title: "状态",
    render: (record) => {
      const status = record.status;
      return (
        <div>
          <p>
            <Tooltip title="点击修改状态">
            <Popconfirm title={`确定修改状态为【${status==="0"?"上架":"下架"}】吗？`} onConfirm={() => modifyStatus({id: record.id, status: status==="1"?"0":"1"})}>
              <Button type={status==="0"?"danger":"primary"} icon={status==="0"?"eye-invisible":"eye"}>{status==="1"?"上架":"下架"}</Button>
            </Popconfirm>
            </Tooltip>
          </p>
          <p><Tooltip title="规格数，点击查看"><Button onClick={()=>onShowSpecs(record)}>规格：{record.specsCount}</Button></Tooltip></p>
        </div>
      );
    }
  }, {
    title: '操作',
    dataIndex: "id",
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.title} {...delOpts}/>
      );
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  };

  const specsOpts = {
    visible: specsVisible,
    title: '规格配置',
    maskClosable: false,
    cancelText: "关闭窗口",
    specsList: specsList,
    okText: "添加规格",
    onCancel: () => {
      modifyState({specsVisible: false});
    },
    onOk: (obj) => {
      obj.proId = item.id;
      obj.proTitle = item.title;
      obj.cateId = item.cateId;
      obj.cateName = item.cateName;
      saveSpecs(obj);
    },
    deleteSpecs: (obj)=> {
      deleteSpecs(obj);
    }
  };

  return (
    <div>
      <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
      {specsVisible && <ListSpecs {...specsOpts}/>}
    </div>
  );
};

export default List;
