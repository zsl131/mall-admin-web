import React from "react";
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1607054_4b83i16u9bm.js',
});
export default class MiniIcon extends React.Component {
  render() {
    return (
      <IconFont type={this.props.type} />
    );
  }
}

MiniIcon.defaultProps = {
  type: ""
};
