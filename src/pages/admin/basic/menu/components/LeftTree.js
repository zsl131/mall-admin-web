import React from 'react';
import { Tree } from 'antd';
import styles from "./leftTree.css"

const TreeNode = Tree.TreeNode;

const LeftTree = ({
  menuTree,
  onSelect,
}) => {

  const handlerSelect = (key, e) => {
    let nodeName = "根";
    try {
      nodeName = e.selectedNodes[0].props.title;
    } catch (e) {
    }
    //console.log("key:::"+key+"--->name:"+nodeName, e);
    onSelect({pid: key[0], name: nodeName});
  };

  const menus = menuTree.map((obj) => {
    return (
      <TreeNode title={obj.menu.name} key={obj.menu.id} >
        {
          obj.children.map((sub)=> {return (<TreeNode title={sub.name} key={sub.id}/>);})
        }
      </TreeNode>
    );
  });
  return(
    <Tree className={styles.tree} onSelect={handlerSelect}>
      {menus}
    </Tree>
  );
}

export default LeftTree;
