import React from 'react';
import { Button } from 'antd';

const Operator = ({
  onAdd,
}) => {
  return(
    <div className="listOperator"><Button type="primary" icon="upload" onClick={onAdd}>财务登记</Button></div>
  );
}

export default Operator;
