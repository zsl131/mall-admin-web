import React from 'react';
import { Button, Popconfirm } from 'antd';

const Operator = ({
  onAdd,
  msg,
  handlerOrderNo,
}) => {
  return(
    <div className="listOperator">
      <Popconfirm title="确定重新生成模块序号吗？" placement="bottom" onConfirm={handlerOrderNo}>
        <Button type="default" icon="reload">重构模块序号</Button>
      </Popconfirm>
      &nbsp;&nbsp;
      <Button type="primary" icon="plus" onClick={onAdd}>{msg?msg:"添加数据"}</Button>
    </div>
  );
}

export default Operator;
