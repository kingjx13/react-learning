# React 用户管理系统 / React User Management System

一个基于 React + React Router 的用户管理应用，演示了 React 开发的核心概念和最佳实践。
A React + React Router based user management application that demonstrates core React concepts and best practices.

---

## 功能特性 / Features

### 1. 用户列表展示 / User List Display

- 以卡片形式展示所有用户 / Display all users as cards
- 每个卡片显示用户的姓名、用户名和邮箱 / Each card shows user's name, username, and email
- 点击"查看详情"跳转到用户详情页面 / Click "View Details" to navigate to user detail page

### 2. 用户详情查看 / User Detail View

- 展示用户的完整信息（姓名、用户名、邮箱、电话、网站）/ Display complete user information
- 显示用户的地址信息 / Show user's address information
- 显示用户的公司信息 / Show user's company information
- 提供"返回列表"按钮 / Provide "Back to List" button

### 3. 用户搜索 / User Search

- 支持按姓名或用户名实时搜索 / Search by name or username in real-time
- 搜索结果即时更新 / Search results update instantly

### 4. 用户筛选 / User Filter

- 按用户名排序 / Sort by username
- 按邮箱排序 / Sort by email
- 一键切换筛选模式 / One-click filter mode switching

### 5. 用户编辑 / User Edit

- 点击"编辑"按钮进入编辑模式 / Click "Edit" to enter edit mode
- 支持修改用户信息 / Modify user information
- 提供"保存"和"取消"按钮 / Provide "Save" and "Cancel" buttons

### 6. 用户新增 / User Add

- 点击"添加新用户"显示新增表单 / Click "Add New User" to show add form
- 填写信息后提交 / Fill in information and submit
- 新用户自动添加到列表 / New user is added to the list

### 7. 用户删除 / User Delete

- 点击"删除"按钮弹出确认框 / Click "Delete" to show confirmation dialog
- 确认后从列表中移除 / User is removed after confirmation

---

## 技术栈 / Tech Stack

- **React 18** - UI 框架 / UI Framework
- **React Router v6** - 路由管理 / Routing
- **Vite** - 构建工具和开发服务器 / Build tool and dev server
- **Fetch API** - HTTP 请求 / HTTP Requests

---

## React 核心概念 / React Core Concepts

### Hooks

- `useState` - 状态管理 / State management
- `useEffect` - 副作用处理 / Side effect handling
- `useParams` - 路由参数获取 / Route parameter retrieval

### 路由 / Routing

- `BrowserRouter` - 路由容器 / Routing container
- `Routes` / `Route` - 路由定义 / Route definition
- `Link` - 客户端导航链接 / Client-side navigation

### 状态管理 / State Management

- 受控组件 / Controlled Components
- 状态不可变性原则 / Immutability principle
- 条件渲染 / Conditional Rendering
- 列表渲染与 Key 属性 / List Rendering and Key Props

### 异步操作 / Async Operations

- async/await 语法 / async/await syntax
- Fetch API（GET/POST/PUT/DELETE）
- 错误处理 / Error handling

---

## 项目结构 / Project Structure

```
react-project/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── UserDetail.jsx    # 用户详情组件 / User detail component
│   │   └── UserList.jsx       # 用户列表组件 / User list component
│   ├── App.css                # 应用样式 / App styles
│   ├── App.jsx                # 根组件 / Root component
│   ├── index.css              # 全局样式 / Global styles
│   └── main.jsx               # 应用入口 / App entry
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 安装与运行 / Installation & Usage

### 安装依赖 / Install Dependencies

```bash
cd react-project
npm install
```

### 启动开发服务器 / Start Dev Server

```bash
npm run dev
```

访问 http://localhost:5173 查看应用 / Visit http://localhost:5173 to view the application.

### 构建生产版本 / Build for Production

```bash
npm run build
```

构建产物将输出到 `dist` 目录 / Build output will be in the `dist` directory.

---

## API 数据源 / API Data Source

本项目使用 [JSONPlaceholder](https://jsonplaceholder.typicode.com) 提供的免费 REST API：
This project uses the free REST API from [JSONPlaceholder](https://jsonplaceholder.typicode.com):

- 获取用户列表 / Get users: `GET /users`
- 获取单个用户 / Get single user: `GET /users/:id`
- 创建用户 / Create user: `POST /users`
- 更新用户 / Update user: `PUT /users/:id`
- 删除用户 / Delete user: `DELETE /users/:id`

---

## 学习建议 / Learning Path

1. **从 App.jsx 开始** / **Start with App.jsx** - 了解 React Router 的基本配置 / Learn React Router basic configuration
2. **阅读 UserList.jsx** - 学习 Hooks 使用、状态管理、事件处理 / Learn Hooks usage, state management, event handling
3. **阅读 UserDetail.jsx** - 学习路由参数获取、条件渲染 / Learn route parameter retrieval, conditional rendering
4. **尝试修改代码** / **Try modifying code** - 添加新功能或修改现有功能 / Add new features or modify existing ones
5. **阅读代码注释** / **Read code comments** - 每个关键概念都有详细的中文注释说明 / Each key concept has detailed comments

---

## 贡献 / Contributing

欢迎提出问题和改进建议！/ Issues and suggestions are welcome!

## 许可证 / License

MIT License
