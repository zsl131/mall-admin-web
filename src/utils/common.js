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

export {
  buildCopyYear,
  logout,
  formItemLayout,
  formItemLayout_large,
  uuid,
  password,
  confirmModal,
}
