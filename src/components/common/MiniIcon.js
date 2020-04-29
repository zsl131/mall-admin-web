import React from "react";
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1607054_nykaibr90vg.js',
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
