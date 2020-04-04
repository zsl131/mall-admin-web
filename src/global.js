import '@babel/polyfill'
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

window.routerBase = "/"; //手动刷新时才不会找不到页面
