import React from 'react';
import { Button, Icon } from 'antd';
import AddCategoryModal from '@/pages/admin/productCategory/components/AddCategoryModal';
import ListCategory from '@/pages/admin/productCategory/components/ListCategory';
import UpdateCategoryModal from '@/pages/admin/productCategory/components/UpdateCategoryModal';

class ListProduct extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    category:{},
    item:{},
  };

  render() {
    const {
      dataSource,
      addProduct,
      updateProduct,
      category,
      deleteProduct,
      loading
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
      title: `添加产品到【${category?category.name:"根"}】`,
      category: category,
      maskClosable: false,
      confirmLoading: loading.effects['productCategory/Product'],
      onOk: (obj) => {
        addProduct(obj);
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
        deleteProduct(record);
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
      title: `修改产品【${item.name}】`,
      item: item,
      maskClosable: false,
      confirmLoading: loading.effects['productCategory/updateProduct'],
      onOk: (obj) => {
        //console.log(obj);
        updateProduct(obj);
        modifyVisible(false, false);
      },
      onCancel() {
        modifyVisible(false, false);
      }
    };

    return(
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 产品信息管理<b>（{dataSource.length}）[{category?category.name:"根"}]</b></h3>
          <div className="listOperator"><Button type="primary" icon="plus" onClick={onAdd}>添加产品</Button></div>
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

export default ListProduct;

