import React from 'react';
import { Button } from 'antd';

const Operator = ({
  onAdd,
  onSynch
}) => {
  return(
    <div className="listOperator"><Button type="primary" icon="plus" onClick={onAdd}>添加数据</Button>
      &nbsp;&nbsp;  <Button type="primary" icon="reload" onClick={onSynch}>同步模板</Button></div>
  );
}

export default Operator;
