module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1",
        },
        corejs: 2, //新版本需要指定核⼼库版本
        useBuiltIns: "usage", //按需注⼊入
      },
    ],
    "@babel/preset-react", // 处理jsx
  ],
  plugins: [
    [
      "@babel/transform-react-jsx",
      {
        prama: "React.createElement",
      },
    ],
    "@babel/plugin-transform-runtime",
  ],
};
