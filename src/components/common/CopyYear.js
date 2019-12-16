import React from 'react';
import {buildCopyYear} from "@/utils/common";
import styles from "./copy.css";

/**
 * 生成页底，如：CopyRight
 */
export default class CopyYear extends React.Component {

  render() {
    const str = buildCopyYear();
    return (
      <div className={styles.copyDiv}>{str} Created By {this.props.author}</div>
    );
  }
}
CopyYear.defaultProps = {
  author: "zsl"
}
