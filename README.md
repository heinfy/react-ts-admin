# React-antd-admin

此项目是用[Create React App](https://create-react-app.dev/)创建的，采用 `typescript + less`。

## 启动配置

- `antd` 版本 `4.15.0`
- `create-react-app` 版本 `4.0.3`

在 `node_modules` 下的 `antd/lib/upload/interface` 添加：

```js
export interface RcFile extends OriRcFile {
    originFileObj: RcFile; // 新加配置
    readonly lastModifiedDate: Date;
}
```

## 可用脚本

```bash

npm start

# Runs the app in the development mode.\

npm test

# Launches the test runner in the interactive watch mode.\

npm run build

# Builds the app for production to the `build` folder.\
# It correctly bundles React in production mode and optimizes the build for the best performance.
# The build is minified and the filenames include the hashes.

npm run eject

# Note: this is a one-way operation. Once you `eject`, you can’t go back!
# If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

# Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

# You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

npm run analyze

# analyzes JavaScript bundles
```

## 代码风格

本仓库采用[ESLint](https://eslint.org/) + [prettier](https://prettier.io/)，在 `commit` 的时候采用 `husky` 钩子处理。

+ [搞懂 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/80574300)
+ [ESLint+Prettier代码规范实践](https://www.jianshu.com/p/dd07cca0a48e)
+ [配置eslint风格](https://blog.csdn.net/Snow_GX/article/details/92089358)
+ [如何在git提交时作代码校验](https://blog.csdn.net/qq_29055201/article/details/89248572)
