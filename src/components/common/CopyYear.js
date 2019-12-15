import React from 'react';
import common from "@/utils/common";

/**
 * 生成页底，如：CopyRight
 */
export default class CopyYear extends React.Component {

  render() {
    const str = common.buildCopyYear();
    return (
      <span>{str} Created By {this.props.author}</span>
    );
  }
}
CopyYear.defaultProps = {
  author: "zsl"
}
