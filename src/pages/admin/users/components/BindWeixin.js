import React from 'react';
import {Alert, Card, Spin} from 'antd';

export default class BindWeixin extends React.Component {

  state = {
    timer: null
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    const timerId = parseInt(sessionStorage.getItem("timerId"));
    if(timerId) {clearInterval(timerId); sessionStorage.removeItem("timerId");}
  }

  render() {

    const props = this.props;

    const timerId = parseInt(sessionStorage.getItem("timerId"));
    if(timerId) {clearInterval(timerId); sessionStorage.removeItem("timerId");}
    if(props.hasBind==='0' && props.wxAccount.ticket) {
      const timer = setInterval(()=>{
        props.bindCheck(props.wxAccount.token);
      }, 1000);
      sessionStorage.setItem("timerId", timer+"");
    }

    return (
      <div>
        <Card style={{"textAlign":"center"}}>
          {
            props.hasBind==='1'?
              <div>
                <h3>已经绑定微信</h3>
                <img src={props.wxAccount.avatarUrl} style={{"border":"1px #ddd solid", "padding":"3px", "margin":"8px", "width":"150px"}}/>
                <p>昵称：{props.wxAccount.nickname}</p>
              </div>:
              <div style={{"textAlign":"center"}}>
                {
                  props.wxAccount.ticket?
                    <div>
                      <img width={200}
                           src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${props.wxAccount.ticket}`}/>
                      {props.wxError==='1'?<Alert message={props.wxMessage} type="warning" showIcon/>:<Alert message={props.wxMessage} type="success" showIcon/>}
                    </div>:
                    <div style={{"padding":"30px 0px"}}><Spin size="large" /></div>
                }
              </div>
          }
        </Card>
      </div>
    )
  }
}
