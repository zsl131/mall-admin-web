import React from 'react';
import { Button, Pagination, Table, Tag, Tooltip } from 'antd';
import IconText from '@/components/common/IconText';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  showPapers,
  onVerify,
  ...listOpts
}) => {

  const columns = [{
    title: '姓名',
    dataIndex: 'id',
    render:(text, record)=> {
      return (<div><b>{record.name}</b><p>{record.nickname}</p></div>)
    }
  }, {
    title: '联系方式',
    // dataIndex: 'level'
    render:(record)=> {
      return (
        <div>
          <p>手机号码：{record.phone}</p>
          <p>{record.provinceName}{record.cityName}{record.countyName}{record.street}</p>
        </div>
      )
    }
  }, {
    title: "状态",
    render:(record) => {
      const status = record.status;
      return (
        <div>
          {status==="0"?<span className="dark">待审核</span>:(status==="1"?<span><b className="blue">审核通过</b><b>[{record.levelName}]</b></span>:<b className="red">驳回</b>)}
          <p>{record.hasExperience==="1"?<b className="blue">有经验</b>:<b className="red">无经验</b>}<Tooltip title="自己的邀请码">[{record.ownCode}]</Tooltip></p>
        </div>
      )
    }
  }, {
    title: '上级',
    render:(record)=> {
      //console.log(record)
      return (
        record.leaderId?<div>
          <p>{record.leaderName}<Tooltip title="上级邀请码">[{record.leaderCode}]</Tooltip></p>
          <p>{record.leaderPhone}</p>
        </div>:<span className="red">无上级</span>
      )
    }
  }, {
    title: "次数",
    render: (record)=> {
      return (
        <div>
          <p>
            <Tooltip title="审核次数"><Tag color="orange"><IconText type="scan" text={record.verifyCount}/></Tag></Tooltip>
            <Tooltip title="等级调整次数"><Tag color="blue"><IconText type="flag" text={record.relationCount}/></Tag></Tooltip>
          </p>
          <p>
            <Tooltip title="子代理数"><Tag color="purple"><IconText type="apartment" text={record.subCount}/></Tag></Tooltip>
            <Tooltip title="销量"><Tag color="red"><IconText type="shopping-cart" text={record.ordersCount}/></Tag></Tooltip>
          </p>
        </div>
      )
    }
  }, {
    title: "证件",
    render: (record)=> {
      return (
        <div>
          {record.paperCount===0?<b className="red">无证件</b>:<Button onClick={()=>showPapers(record)} type="primary">{record.paperCount} 份证件</Button>}
          <p>{record.identity}</p>
        </div>
      )
    }
  }, {
    title: '审核',
    render: (text, record) => {
      return (
        <div>
          {/*<ListOperator id={record} delName={record.name} {...delOpts}/>*/}
          {/*<Popconfirm title="确定通过审核吗？" onConfirm={()=>onVerify(record, "1", "审核通过", false)}><Button type="primary">通过</Button></Popconfirm>*/}
          {record.status==='1' && <Button type="primary" onClick={()=>onVerify(record, "1", "等级调整", false)}>等级调整</Button>}&nbsp;
          {record.status!=='1' && <Button type="primary" onClick={()=>onVerify(record, "1", "审核通过", false)}>通过</Button>}&nbsp;
          {record.status==='0' && <Button type="danger" onClick={()=>onVerify(record, "2", "", true)}>驳回</Button>}
        </div>
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

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
};

export default List;
