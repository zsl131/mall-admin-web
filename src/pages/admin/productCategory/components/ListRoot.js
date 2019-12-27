import React from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import AddCategoryModal from '@/pages/admin/productCategory/components/AddCategoryModal';
import ListCategory from '@/pages/admin/productCategory/components/ListCategory';
import UpdateCategoryModal from '@/pages/admin/productCategory/components/UpdateCategoryModal';

class ListRoot extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    category:{},
    item:{},
  };

  render() {
    const {
      dataSource,
      addCategory,
      updateCategory,
      category,
      deleteCategory,
      loading,
      handlerOrderNo,
      changeOrderNo,
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
      title: `添加分类到【${category?category.name:"根"}】`,
      category: category,
      maskClosable: false,
      confirmLoading: loading.effects['productCategory/addCategory'],
      onOk: (obj) => {
        addCategory(obj);
        modifyVisible(true, false);
      },
      onCancel() {
        modifyVisible(true, false);
      }
    };

    const listOpts = {
      dataSource: dataSource,
      // loading: loading.models.agentLevel,
      // location,
      totalElement: dataSource.length,
      onDelConfirm: (record) => {
        deleteCategory(record);
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
      changeOrderNo: (obj) => {
        changeOrderNo(obj);
      }
    };

    const updateOpts = {
      visible: updateVisible,
      title: `修改分类【${item.name}】`,
      item: item,
      maskClosable: false,
      confirmLoading: loading.effects['productCategory/updateCategory'],
      onOk: (obj) => {
        console.log(obj);
        updateCategory(obj);
        modifyVisible(false, false);
      },
      onCancel() {
        modifyVisible(false, false);
      }
    };

    return(
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 产品分类管理<b>（{dataSource.length}）[<span className="red">{category?category.name:"根"}</span>]</b></h3>
          <div className="listOperator">
            <Popconfirm title="确定重新生成分类序号吗？" placement="bottom" onConfirm={handlerOrderNo}>
              <Button type="default" icon="reload">重构分类序号</Button>
            </Popconfirm>
            &nbsp;&nbsp;

            <Button type="primary" icon="plus" onClick={onAdd}>添加分类</Button>
          </div>
        </div>
        <div className="listContent">
          <ListCategory {...listOpts} />
        </div>

        {addVisible && <AddCategoryModal {...addOpts}/>}
        {updateVisible && <UpdateCategoryModal {...updateOpts}/>}
      </div>
    );
  }
}

export default ListRoot;

