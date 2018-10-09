# React-Canvas-Nest

>canvas-nest的React版  

[![NPM version](https://img.shields.io/npm/v/react-canvas-nest.svg)](https://www.npmjs.com/package/react-canvas-nest) [![GitHub license](https://img.shields.io/github/license/flyerH/react-canvas-nest.svg)](https://github.com/flyerH/react-canvas-nest/blob/master/LICENSE)

## 安装  

```sh
# 推荐使用 yarn
yarn add react-canvas-nest

# 或者使用 npm
npm install react-canvas-nest
```

## 使用  

**使用方法可参考 [example](./example)**

- 引入组件  

```js
import ReactCanvasNest from 'react-canvas-nest';
```  

- 使用组件  

  - 默认  
  
  ```jsx
  <ReactCanvasNest />
  ```  

  - 自定义  
  
  ```jsx
  <ReactCanvasNest className = 'nest' config = {{ pointColor: ' 255, 255, 255 ' }} style = {{ zIndex: 99 }} />
  ```  

## API  
### className  

    支持className  

### config  

| 参数          | 说明             | 默认值     |
| ------------ | :--------------: | :-------: |
| count        | 点的数量          | 99        |
| pointR       | 点的半径          | 1         |
| pointColor   | 点的颜色          | 255, 0, 0 |
| pointOpacity | 点的透明度        | 1         |
| dist         | 两点相连的最大距离 | 6000       |
| lineColor    | 两点间连线的颜色   | 0, 0, 0   |
| lineWidth    | 两点间连线的宽度   | 1         |
| follow       | 鼠标跟随         | true       |  

### style  

    支持自定义style，默认使用的样式如下：

| 参数          | 默认值     |
| ------------ | :-------: |
| zIndex       | -1        |
| opacity      | 1         |
| display      | block     |
| position     | absolute  |

## License

React-Canvas-Nest is [MIT licensed](./LICENSE).