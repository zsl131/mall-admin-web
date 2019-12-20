import React from 'react';
import { Pagination, Table, Menu, Icon, Popconfirm, Tooltip } from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  stopTask,
  startTask,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const BuildPeriod = ({period}) => {
    return (
      <b className="red" key={period}>{period}</b>
    )
  };

  const columns = [{
    title: '状态',
    render:(record) => {
      return (
        record.status === "1"?
          <Tooltip title="任务运行中"><Icon type="smile" theme="twoTone" /></Tooltip>:
          <Tooltip title="任务已停止运行"><Icon type="frown" theme="twoTone" twoToneColor="#eb2f96"/></Tooltip>
      );
    }
  }, {
    title: '名称',
    // dataIndex: 'taskDesc'
    render:(record) => {
      return(
        <div><p>{record.taskDesc}</p>
          <p>
            <Tooltip title="成功次数"><b className="blue">{record.sucCount}</b></Tooltip> /
            <Tooltip title="失败次数"><b className="red">{record.errCount}</b></Tooltip>
          </p>
        </div>
      );
    }
  }, {
    title: 'beanName',
    dataIndex: 'beanName'
  }, {
    title: "methodName",
    dataIndex: "methodName"
  }, {
    title: "任务类型",
    render:(record) => {
      return (
        record.type==="1"?"单次任务":(record.type==="2"?"循环任务":"Cron任务")
      );
    }
  }, {
    title: "任务规则",
    render:(record) => {
      return (
        record.type==="1"?<span>执行时间：{record.startTime?record.startTime:"立即"}</span>:
          (
            record.type==="2"?
          <div>
            {record.isWait==="1"?
              <span>执行后等待[<BuildPeriod period={record.period}/>]秒执行</span>:
              <span>运行完成[<BuildPeriod period={record.period}/>]秒后执行</span>
            }
            <br/>执行时间：{record.startTime?record.startTime:"立即"}
          </div>:
          <span>Cron规则：{record.cron}</span>
          )
      );
    }
  }, {
    title: "参数",
    dataIndex: "params"
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.taskDesc} {...delOpts}>
          <Menu.Item>
            {/*<span onClick={()=>stopTask(record.taskName)}><Icon type="close"/> -停止该任务</span>*/}
            {
              record.status==="1" ?
                <Popconfirm okType="danger" onConfirm={()=>stopTask(record.taskUuid)} title={`确定要停止任务[${record.taskDesc}]？`}><Icon type="close"/> 停止该任务</Popconfirm>:
                <Popconfirm onConfirm={()=>startTask(record.id)} title={`确定要启动任务[${record.taskDesc}]？`}><Icon type="check"/> 启动该任务</Popconfirm>
            }
          </Menu.Item>
        </ListOperator>
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
    <Table {...listOpts} columns={columns} rowKey="taskName" pagination={false} footer={pager}/>
  );
};

export default List;
