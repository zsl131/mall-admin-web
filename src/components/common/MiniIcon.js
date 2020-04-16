import React from "react";
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1607054_c3p9opul65f.js',
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
