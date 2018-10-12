# React-Canvas-Nest
[![NPM version](https://img.shields.io/npm/v/react-canvas-nest.svg)](https://www.npmjs.com/package/react-canvas-nest) [![GitHub license](https://img.shields.io/github/license/flyerH/react-canvas-nest.svg)](https://github.com/flyerH/react-canvas-nest/blob/master/LICENSE) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-canvas-nest.svg)](https://bundlephobia.com/result?p=react-canvas-nest)

[English](./README.md) | 简体中文

>canvas-nest的React版  

创意来源于 [canvas-nest.js](https://github.com/hustcc/canvas-nest.js) 项目

![screenshot](./screenshot.jpg)

## 安装  

```bash
# 推荐使用 yarn
yarn add react-canvas-nest

# 或者使用 npm
npm install react-canvas-nest
```

## 使用  

**注意：**
- 使用方法可参考 [example](./example)
- 组件大小取决于父元素大小

引入组件  

```js
import ReactCanvasNest from 'react-canvas-nest';
```  

使用组件  

  - 默认  
  
  ```jsx
  <ReactCanvasNest />
  ```  

  - 自定义  
  
  ```jsx
  <ReactCanvasNest className = 'canvasNest' config = {{ pointColor: ' 255, 255, 255 ' }} style = {{ zIndex: 99 }} />
  ```  

## API
### className  

    支持className属性

### config  

| 参数          | 说明             | 默认值         |
| ------------ | :--------------: | :-----------: |
| count        | 点的数量          | 88            |
| pointR       | 点的半径          | 1             |
| pointColor   | 点的颜色          | 114, 114, 114 |
| pointOpacity | 点的透明度        | 1             |
| dist         | 两点相连的最大距离 | 6000           |
| lineColor    | 两点间连线的颜色   | 0, 0, 0       |
| lineWidth    | 两点间连线的宽度   | 1             |
| follow       | 鼠标跟随         | true           |  
| mouseDist    | 鼠标与点之间的距离 | 20000          |

### style  

    支持自定义style属性，默认使用的样式如下：

| 参数          | 默认值     |
| ------------ | :-------: |
| zIndex       | -1        |
| opacity      | 1         |
| display      | block     |
| position     | absolute  |

## 相关项目
- [canvas-nest.js](https://github.com/hustcc/canvas-nest.js): canvas-nest原生js版
- [vue-canvas-nest](https://github.com/ZYSzys/vue-canvas-nest): canvas-nest vue版
- [canvas-nest-for-wp](https://github.com/aTool-org/canvas-nest-for-wp): wordpress插件，在插件市场搜索 `canvas-nest` 即可安装

## License

React-Canvas-Nest is [MIT licensed](./LICENSE).