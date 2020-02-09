import { encodeBase64 } from '@/utils/Base64Utils';
import { Modal } from 'antd';

/**
 * 生成CopyRight日期
 */
function buildCopyYear() {
  const date = new Date();
  const curYear = date.getFullYear();
  return "© "+curYear + "-" + (curYear+2);
}

/**
 * 退出登陆
 *  - 手动点击时需要使用
 *  - 当服务端提示登陆失效时需要调用
 */
function logout() {
  sessionStorage.clear();
  localStorage.clear();
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
};

const formItemLayout_large = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 },
  },
};

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

/**
 * 上传到服务器参数加密
 * @param params
 * @returns {*|[]}
 */
function password(params) {
  const paramsType = Object.prototype.toString.call(params);
  if(paramsType === '[object Object]') {
    // params.loginUser = getLoginUser(); //强行加上登陆用户
    params = JSON.stringify(params); //如果是对象则转换成字符串
  }
  params = encodeURI(params);
  // params = toBase64(params);
  params = encodeBase64(params);
  return params;
}

/**
 * 系统提示
 * @param title
 * @param content
 * @param onOk
 * @param onCancel
 * @param okText
 * @param cancelText
 */
function confirmModal({title="系统提示", content, onOk, onCancel, okText="确定", cancelText="取消"}) {
  Modal.confirm({
    title: title,
    content: content,
    okText: okText,
    cancelText: cancelText,
    onCancel: () => {
      if(onCancel) {
        onCancel();
      }
    },
    onOk: ()=> {
      onOk();
    }
  });
}

/**
 * 生成排序对象
 * @param dataSource
 * @param dragIndex
 * @param hoverIndex
 * @returns {[]}
 */
function buildSortObj(dataSource, dragIndex, hoverIndex) {
  let result = [];
  const obj2 = dataSource[hoverIndex];
  dataSource.map((item, index)=> {
    let obj = {id: item.id, name: item.name};
    if(dragIndex>hoverIndex) { //从下往上拉
      if(index>=hoverIndex && index<dragIndex) {
        obj.orderNo = item.orderNo+1;
      } else if(dragIndex===index) {
        obj.orderNo = obj2.orderNo;
      } else {
      }
    } else { //从上往下拉
      if(index<=hoverIndex && index>dragIndex) {
        obj.orderNo = item.orderNo-1;
      } else if(dragIndex===index) {
        obj.orderNo = obj2.orderNo;
      } else {
      }
    }
    if(obj.orderNo) { //即修改过orderNo的才可以被添加
      result.push(obj);
    }
    return item;
  });
  return result;
}

/**
 * 把秒转换成其他格式
 * @param second
 */
function rebuildTime(s) {
  const day = Math.floor( s/ (24*3600) ); // Math.floor()向下取整
  const hour = Math.floor( (s - day*24*3600) / 3600);
  const minute = Math.floor( (s - day*24*3600 - hour*3600) /60 );
  const second = s - day*24*3600 - hour*3600 - minute*60;
  return day + "天"  + hour + "时" + minute + "分" + second + "秒";
}

export {
  buildCopyYear,
  logout,
  formItemLayout,
  formItemLayout_large,
  uuid,
  password,
  confirmModal,
  buildSortObj,
  rebuildTime,
}
