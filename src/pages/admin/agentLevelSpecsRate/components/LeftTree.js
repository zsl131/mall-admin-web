import React from 'react';
import { Tree, Input } from 'antd';
import styles from "./leftTree.css"

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class LeftTree extends React.Component {

  state = {
    expandedKeys: [],
    searchValue: '',
    expandAll: true,
    autoExpandParent: true,
  };

  render() {
    const {treeData, onSelect} = this.props;
    // const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const handlerSelect = (key, e) => {
      let name = "根";
      try {
        name = e.node.props.nodeName;
      } catch (e) {
      }
      let isDetail = false;
      try {
        isDetail = key[0].startsWith('detail_');
      } catch (e) {
      }
      if(isDetail) {
        onSelect(key, name);
      }
    };

    const onSearch = (e) => {
      // console.log(e.target.value);
      this.setState({searchValue: e.target.value, expandAll: true});
    };

    const buildTitle = (oldTitle) => {
      const searchValue = this.state.searchValue;
      const index = oldTitle.indexOf(searchValue);
      const beforeStr = oldTitle.substr(0, index);
      const afterStr = oldTitle.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{oldTitle}</span>;
      return title;
    };

    const menus = treeData.map((obj) => {
      return (
        <TreeNode nodeName={obj.category.name} disabled={true} title={buildTitle(obj.category.name + "("+ obj.children.length +")")} key={`root_${obj.category.id}`} >
          {
            obj.children.map((sub)=> {return (<TreeNode disabled={true} nodeName={sub.category.name} title={buildTitle(sub.category.name + "("+ sub.proList.length +")")} key={`child_${sub.category.id}`}>
              {
                sub.proList.map((c)=>{return (<TreeNode nodeName={c.title} title={buildTitle(c.title)} key={`detail_${c.id}`}/>)})
              }
            </TreeNode>);})
          }
        </TreeNode>
      );
    });
    return(
      <div>
        <Search className={styles.searchInput} onChange={onSearch} placeholder="可输入名称筛选"/>
        <Tree className={styles.tree} onSelect={handlerSelect}
              defaultExpandAll={this.state.expandAll}
        >
          {menus}
        </Tree>
      </div>
    );
  }
}
