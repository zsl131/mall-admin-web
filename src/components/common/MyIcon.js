import React from "react";
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1539644_11290k22rio.js',
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
