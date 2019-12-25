import React from 'react';
import { Button, Pagination, Table, Tag, Tooltip } from 'antd';
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
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '产品名称',
    // dataIndex: 'title'
    render:(record)=> {
      return (
        <div>
          <b>{record.title}</b>
          <p>基金：{record.fund}</p>
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
          <p><Button type={status==="0"?"danger":"primary"} icon={status==="0"?"eye-invisible":"eye"}>{status==="1"?"显示":"隐藏"}</Button></p>
          <p><Tooltip title="规格数，点击查看"><Button onClick={()=>onShowSpecs(record)}>规格：{record.specsCount}</Button></Tooltip></p>
        </div>
      );
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.name} {...delOpts}/>
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
