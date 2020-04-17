import React from 'react';
import { Dropdown, Icon, Menu, Pagination, Popconfirm, Table } from 'antd';
import styles from '@/pages/admin/carousel/components/list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  onRelationImage,
  onUpdateType,
  ...listOpts
}) => {

  const columns = [{
    title:"图片",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <a href={record.headImgUrl} target="_blank" rel="noopener noreferrer"><img src={record.headImgUrl} alt={record.nickname} className={styles.avatarImg}/></a>
      );
    }
  }, {
    title: '昵称',
    dataIndex: 'nickname',
    render:(text, record) => {
      const status = record.status;
      return (
        <div>
          <p>{record.nickname}</p>
          <p>{status==='1'?<b className="blue">关注</b>:<b className="red">取消关注</b>}</p>
        </div>
      )
    }
  }, {
    title: 'id',
    render: (record)=> {
      return (
        <div>
          <p>oid:{record.openid}</p>
          <p>uid:{record.unionid}</p>
        </div>
      )
    }
  }, {
    title: '类型',
    render: (text, record) => {
      return dropdownCon(record);
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          <p>初次关注：{record.createTime}</p>
          <p>最近关注：{record.followTime}</p>
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
          -
        </div>
      );
    }
  }];

  const dropdownCon = (record) => {
    const menus = menu(record);
    return (
      <Dropdown overlay={menus}>
        <a className="ant-dropdown-link" href="###">
          {typeStr(record.type)}
          <Icon type="down" />
        </a>
      </Dropdown>
    );
  };

  const typeStr = (type) => {
    switch(type) {
      case "1" : return "代理";
      case "5" : return "公司员工";
      case "10" : return "管理员";
      default: return "顾客";
    }
  };

  const menu = (record) => {
    const type = record.type;
    const nickname = record.nickname;
    return (
      <Menu key="key">
        {type === '0'?'':
          <Menu.Item key="0">
            <Popconfirm title={`确定设置[${nickname}]为：顾客 吗？`}
                        onConfirm={() => handleSetType(record, "0")} {...confirmOpts}>设置为：顾客</Popconfirm>
          </Menu.Item>
        }
        {type === '1'?'':
          <Menu.Item key="1">
            <Popconfirm title={`确定设置[${nickname}]为：代理 吗？`}
                        onConfirm={() => handleSetType(record, "1")} {...confirmOpts}>设置为：代理</Popconfirm>
          </Menu.Item>
        }
        {type === '5' ? '' :
          <Menu.Item key="5">
            <Popconfirm title={`确定设置[${nickname}]为：公司员工 吗？`}
                        onConfirm={() => handleSetType(record, "5")} {...confirmOpts}>设置为：公司员工</Popconfirm>
          </Menu.Item>
        }
        {type === '10' ? '' :
          <Menu.Item key="10">
            <Popconfirm title={`确定设置[${nickname}]为：管理员 吗？`}
                        onConfirm={() => handleSetType(record, "10")} {...confirmOpts}>设置为：管理员</Popconfirm>
          </Menu.Item>
        }
      </Menu>
    );
  };

  const confirmOpts = {
    okText: '确定设置',
    cancelText: '取消',
    placement: 'bottom'
  };

  const handleSetType = (record, newType) => {
    onUpdateType(record, newType);
  };

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
