import React from 'react';
import { Form, Icon, Input, InputNumber, message, Modal, Popconfirm, Table, Tooltip } from 'antd';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    const title = this.props.title;
    if (this.props.inputType === 'number') {
      return <InputNumber placeholder={`${title}`}/>;
    }
    return <Input placeholder={`输入 ${title}`}/>;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `${title} 不能为空`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

@Form.create()
class ListSpecs extends React.Component {

  state = {
    dataSource: this.props.specsList,
    editingKey: -1
  };

  componentDidMount() {
  }

  render() {

    const {
      onOk,
      specsList,
      deleteSpecs,
      ...modalProps
    } = this.props;

    const isEditing = record => record.id === this.state.editingKey;

    const cancel = (ek) => {
      if(ek===0) {
        let dataSource = specsList || [];
        dataSource.splice(dataSource.findIndex(item => item.id === 0), 1);
        this.setState({dataSource: dataSource});
      }
      this.setState({ editingKey: -1 });
    };

    const save = (form, key) => {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        row.id=this.state.editingKey;
        this.props.onOk(row);
        this.setState({editingKey: -1});
      });
    };

    const edit = (key) => {
      const ek = this.state.editingKey;
      if(ek!==-1) {
        message.warn("请先保存或取消编辑中的数据。");
      } else {
        this.setState({ editingKey: key });
      }
    };

    const onAddNew = () => {
      const curEk = this.state.editingKey;
      if(curEk!==-1) {
        message.warn("请先保存或取消编辑中的数据。");
      } else {
        const newData = {name: "", orderNo: 0, remark:'', oriPrice: 0, price:0, id:0};
        let dataSource = specsList || [];

        //console.log(dataSource);
        dataSource.push(newData);
        this.setState({dataSource: dataSource, editingKey: 0});
        // this.setState({ editingKey: 0 });
      }
    };

    const handleOk = (e) => {
      e.preventDefault();
      onAddNew();
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const columns = [{
      editable: true,
      title: '规格名称',
      dataIndex: 'name'
    }, {
      editable: true,
      title: "描述",
      dataIndex: "remark"
    }, {
      editable: true,
      title: "序号",
      dataIndex: "orderNo"
    }, {
      editable: true,
      title: "原价",
      dataIndex: "oriPrice"
    }, {
      editable: true,
      title: "售价",
      dataIndex: "price"
    }, {
      title: '操作',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = isEditing(record);
        return editable ? (
          <span>
              <EditableContext.Consumer>
                {form => (
                    <span>
                      {/*<a onClick={() => this.save(form, record.id)} style={{ marginRight: 8 }} >保存</a>*/}
                      <Tooltip title="保存"><Icon onClick={() => save(form, record.id)} type="check" shape="circle"/></Tooltip>
                    </span>
                )}
              </EditableContext.Consumer>&nbsp;&nbsp;
            <Tooltip title="取消"><Popconfirm title="确定取消保存吗？" onConfirm={() => cancel(record.id)}><Icon type="close"/></Popconfirm></Tooltip>
            </span>
        ) : (
          editingKey===-1 && <span><Tooltip title="编辑"><Icon onClick={() => edit(record.id)} type="edit" /></Tooltip>&nbsp;&nbsp;<Tooltip title="删除"><Popconfirm title={`确定删除[${record.name}]吗？`} onConfirm={() => deleteSpecs(record)}><Icon type="close"/></Popconfirm></Tooltip></span>
        );
      },
    }];

    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const listOpts = {
      dataSource: specsList,
      components: components,
    };

    const usedColumn = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: dataType(col.dataIndex),
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    const dataType = (type)=> {
      if (type==="price" || type==="oriPrice" || type==="orderNo") {
        return 'number';
      } else {
        return 'text';
      }
    };

    return(
      <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
        <EditableContext.Provider value={this.props.form}>
        <Table {...listOpts} columns={usedColumn} rowKey="id" pagination={false} />
        </EditableContext.Provider>
      </Modal>
    );
  }
}

export default ListSpecs;

