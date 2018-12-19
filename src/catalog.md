## src 目录结构说明src

src
├── component
│   ├── checkbox
│   │   ├── style           # 样式文件夹
│   │   ├── index.js        # 组件导出
│   │   ...
│   ├── icon
│   │   ├── style
│   │   └── index.js
│   ├── loading
│   │   ├── style
│   │   ├── index.js
│   ├── radio
│   │   ├── style
│   │   └── index.js
│   ├── style
│   │   ...
│   ├── table
│   │   ├── index.js
│   ├── util
│   │   └── is.js
│   └── index.js            # component 下的 index.js 统一导出所有组件
├── example                 # 组件开发用例文件夹
│   ├── radio               # 对应组件的用例文件夹
│   │   └── index.js        # 用例默认导出文件
│   └── index.js            # example 下的 index.js 统一导出所有组件用例
├── catalog.md
├── icon.js                 # 弃用，删除
├── index.html 
├── index.js                # 用例在此文件中挂载到页面
├── index.less
└── table.js                # 弃用，删除
