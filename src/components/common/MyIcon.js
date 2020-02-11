import React from "react";
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1607054_4d4mdwvcpc.js',
});
export default class MyIcon extends React.Component {
  render() {
    return (
      <IconFont type={this.props.type} />
    );
  }
}

MyIcon.defaultProps = {
  type: "icon-addmeteo"
};
