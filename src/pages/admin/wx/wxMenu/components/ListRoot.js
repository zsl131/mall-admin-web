import React from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import AddModal from './AddModal';
import ListMenu from './ListMenu';
import UpdateModal from './UpdateModal';

class ListRoot extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    menu:{},
    item:{},
  };

  render() {
    const {
      dataSource,
      addObj,
      updateObj,
      menu,
      deleteObj,
      loading,
      handlerPublishMenu,
    } = this.props;

    //console.log(dataSource);

    const {addVisible, updateVisible, item} = this.state;

    const onAdd = () => {this.setState({addVisible: true})};

    const modifyVisible = (isAdd, isShow) => {
      if(isAdd) {
        if(isShow) {this.setState({addVisible: true});} else {this.setState({addVisible: false});}
      } else {
        if(isShow) {this.setState({updateVisible: true});} else {this.setState({updateVisible: false});}
      }
    };

    const addOpts = {
      visible: addVisible,
      title: `添加菜单到【${menu?menu.name:"根"}】`,
      menu: menu,
      maskClosable: false,
      confirmLoading: loading.effects['wxMenu/addObj'],
      onOk: (obj) => {
        addObj(obj);
        modifyVisible(true, false);
      },
      onCancel() {
        modifyVisible(true, false);
      }
    };

    const listOpts = {
      dataSource: dataSource,
      totalElement: dataSource.length,
      onDelConfirm: (record) => {
        deleteObj(record);
      },
      onPageChange: (page) => {
        // handleRefresh({page : page - 1});
      },
      onUpdate: (record) => {
        //dispatch({ type: 'agentLevel/modifyState', payload: {item: record, updateVisible: true} });
        modifyVisible(false, true);
        // console.log(record);
        this.setState({item: record});
      },
    };

    const updateOpts = {
      visible: updateVisible,
      title: `修改菜单【${item.name}】`,
      item: item,
      maskClosable: false,
      confirmLoading: loading.effects['wxMenu/updateObj'],
      onOk: (obj) => {
        //console.log(obj);
        updateObj(obj);
        modifyVisible(false, false);
      },
      onCancel() {
        modifyVisible(false, false);
      }
    };

    return(
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 微信菜单管理<b>（{dataSource.length}）[<span className="red">{menu?menu.name:"根"}</span>]</b></h3>
          <div className="listOperator">
            <Popconfirm title="确定发布菜单吗？" placement="bottom" onConfirm={handlerPublishMenu}>
              <Button type="default" icon="reload">发布菜单</Button>
            </Popconfirm>
            &nbsp;&nbsp;

            <Button type="primary" icon="plus" onClick={onAdd}>添加菜单</Button>
          </div>
        </div>
        <div className="listContent">
          <ListMenu {...listOpts} />
        </div>

        {addVisible && <AddModal {...addOpts}/>}
        {updateVisible && <UpdateModal {...updateOpts}/>}
      </div>
    );
  }
}

export default ListRoot;

