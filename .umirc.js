export default {
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      antd: true,  // antd 默认不开启，如有使用需自行配置
    }],
    // ['umi-plugin-dva', { immer: true }],
    ['umi-plugin-routes', {
      exclude: [
        /models/,
        /services/,
        /components/,
      ],
    }],
    // ['umi-plugin-dva'],
  ],
  exportStatic: true,
  // outputPath: 'E:/temp/test-chess/',
  // hashHistory:true, //加上这个是在地址栏#
  // publicPath: '/static',
  // exportStatic: {},
  // 接口代理示例
  proxy: {
    //程序接口
    "/api": {
      "target": "http://test.example.com:9092/api/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    },
    //编辑器上传文件路径
    "/wangeditor": {
      "target": "http://test.example.com:9092/wangeditor/",
      "changeOrigin": true,
      "pathRewrite": { "^/wangeditor" : "" }
    },
    //Upload上传文件路径
    "/publicFile": {
      "target": "http://test.example.com:9092/publicFile/",
      "changeOrigin": true,
      "pathRewrite": { "^/publicFile" : "" }
    },
    //微信调用配置
    "/wxRemote": {
      "target": "http://test.example.com:9092/wxRemote/",
      "changeOrigin": true,
      "pathRewrite": { "^/wxRemote" : "" }
    },
  },

  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
};
