## Table 项目组件需求描述

> L0 - L4 表示需求的完成必要程度，L0 最高；

### 组件功能需求

+ 1. 现有的 antdesign 和 tdesign 的组件库的table 的全部功能，最好带有优化（L0）;

+ 2. [rsuite](https://rsuitejs.com/en/components/table) 组件库的Table 组件的列拖动功能，要能记录拖动后的列宽度（L0）;

+ 3. 大量数据下的的虚拟渲染优化， 可参考现有虚拟渲染的优化方案，[react-virtualized](https://github.com/bvaughn/react-virtualized)（L1）;

+ 4. 利用[Jest](https://jestjs.io/docs/en/configuration#transform-object-string-string)编写测试用例，保证测试的覆盖率（L1）；

+ 5. 发布到npm仓库中（L0）; 

### 打包发布

在发布前执行下面命令来打包组件：

> npm run build 


<!-- webpack-bundle-analyzer 分析打包后代码体积 -->