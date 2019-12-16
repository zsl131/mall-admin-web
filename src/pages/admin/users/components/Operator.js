import React from 'react';
import { Button } from 'antd';

const Operator = ({
  onAdd,
}) => {
  return(
    <div className="listOperator"><Button type="primary" icon="plus" onClick={onAdd}>添加用户</Button></div>
  );
}

export default Operator;
