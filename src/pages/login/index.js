import React from 'react';
import { connect } from 'dva';
import { Alert, Button, Card, Col, Form, Input, Row, Tabs } from 'antd';
import styles from './index.css';
import Helmet from 'react-helmet';
import router from 'umi/router';
import CopyYear from '@/components/common/CopyYear';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// @Form.create()
// export default class Login extends React.Component
const Login = ({
                 loading,
                 dispatch,
                 interceptor,
  login,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if(!errors) {
        dispatch({ type: 'login/login', payload: values });
      }
    });
  }

  const onTabChange = (key) => {
    if(login.wxInterval) {clearInterval(login.wxInterval);}
    if(key==='wx') {
      dispatch({type: 'login/onQrScene'}).then(()=>{
        const interval = setInterval(()=> {
          const token = sessionStorage.getItem("wxLoginToken");
          if(token) {
            dispatch({type: 'login/wxLoginCheck', payload: token});
          }
        }, 1000);
        dispatch({type: 'login/modifyState', payload: {wxInterval: interval}});
      });
    }
  }

  // const { getFieldDecorator } = this.props.form;
  return (
    <div>
      <Helmet><title>用户登陆</title></Helmet>
      <Row align="middle" justify="center" type="flex" className={styles.mainRow}>
        <Col xs={22} sm={16} md={12} lg={12} xl={9}>
          <Card bordered={false} className={styles.loginCard}>
            <h2 className={styles.title}>用户登陆 - LOGIN</h2>

            <Tabs defaultActiveKey="pwd" onChange={onTabChange}>
              <TabPane tab="用户登陆" key="pwd">
                <Form onSubmit={handleOk} className={styles.loginForm}>
                  <FormItem>
                    {getFieldDecorator('username', {rules:[{ required: true, message: '请输入用户名'}]})(<Input onPressEnter={handleOk} placeholder="用户名"/>)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator("password", {rules:[{ required: true, message: '请输入密码'}]})(<Input onPressEnter={handleOk} type="password" placeholder="密码"/>)}
                  </FormItem>
                  { login.showError &&
                    <Row>
                      <Col style={{ "paddingBottom": "20px" }}>
                        <Alert message={login.errMsg} type="error"/>
                      </Col>
                    </Row>
                  }
                  <Row>
                    <Button className={styles.loginBtn} type="primary" onClick={handleOk} loading={loading.models.login}>登   陆</Button>
                  </Row>
                </Form>
              </TabPane>
            </Tabs>
            <Row className={styles.infoRow}>
              <Col>
                <span>若登陆不成功，可以先检测系统是否已经<Button type="link" onClick={()=>{router.push("/init");}}>完成初始化</Button>！</span>
              </Col>
            </Row>
            <Row className={styles.infoRow}>
              <CopyYear/>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// export default Login;
export default connect(({ loading, interceptor,login }) => ({ loading, interceptor,login }))(Form.create()(Login))
