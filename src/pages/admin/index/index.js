import React from 'react';
import { connect } from 'dva';

const Index = ({
  loading,
 adminIndex
}) => {

  // console.log(adminIndex);

  // console.log(alertMessage());

  return (
    <div style={{"padding":"15px"}} >
      <h2>· 后台首页</h2>
    </div>
  );
}

export default connect(({ loading, adminIndex }) => ({ loading, adminIndex }))(Index);
