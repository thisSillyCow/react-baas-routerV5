### 启动讲解
src/components/main  文件Home  
src/views/login  登录页面
https://juejin.cn/post/6844903942522929160
https://github.com/lanistor/react-keeper
#### 前端体系
技术:
- Vite + React + React-router +  Ant
- 兄弟通讯：events
- echarts-for-react:https://git.hust.cc/echarts-for-react/
- react-keep-alive：https://www.npmjs.com/package/react-keep-alive

特点:
- 高质量的代码、代码结构、和代码注释
- 漂亮的UI，菜单栏、标签页，体验、交互更好用的员工、部门、角色、菜单管理等等
- 优化基于Keepalive的标签页，做到标签页该缓存的时候缓存，比如左右切换等，不该缓存的时候不缓存，比如新建，表单提交结束等
- 全新的基于前端的权限设计（忘掉传统的权限设计吧，已经不适合这个前端时代）
- 支持一级、二级、三级菜单，四级菜单以及搜索功能
- 其他功能：邮件、富文本、消息、系统配置等等

###### 启动
1 安装依赖：

`yarn`

2 运行本地环境

`yarn run dev`

3、账号
`admin 123456  Jeff001 123456`

4、演试接口地址：
`https://pisabeta.innochain.tech/baas-api/swagger-ui.html`

5、演示服务器地址
`/data/apps/baas/`

#### 前端代码规范
- 文件、文件夹、目录结构、组建、变量等等怎么命名
- html、css、less等如何规范
- vue项目目录结构如何划分
- router和store该怎么划分扩展性更好
- vue组件规范该选择哪些
- 以及更多，数不胜数让你觉得实用，同时身心愉悦的规范

# 文件目录 
- src
- api 接口
- assets 图片资源
- components 公共组建
  - main 主题组建
- config 配置文件
- lib 项目工具
- pages 页面
  - business 业务模块
    - information  信息管理
    - user-management  用户管理
  - login 登陆入口
- plugins 第三方工具
- router 路由
- store 数据存储 
- styles 公共 less 
- type 存放 *.d.ts文件
- index.tsx/js 项目根目录文件入口
- 

#文件资源命名
- 文件名不得含有空格
- 文件名建议只使用小写字母，不使用大写字母。( 为了醒目，某些说明文件的文件名，可以使用大写字母，比如README、LICENSE。 )
- 文件名包含多个单词时，单词之间建议使用半角的连词线 ( - ) 分隔。

        // "react-router": "^4.3.1",
