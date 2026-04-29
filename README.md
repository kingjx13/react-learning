# React Learning

一个用于学习 React 的用户管理系统项目，已迁移到 TypeScript。

---

## 目录

- [功能特点](#功能特点)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [安装与运行](#安装与运行)
- [学习要点](#学习要点)
- [License](#license)

---

## 功能特点

- ✅ 用户列表展示
- ✅ 用户搜索功能
- ✅ 用户筛选（按用户名/邮箱排序）
- ✅ 用户详情查看
- ✅ 添加新用户
- ✅ 编辑用户信息
- ✅ 删除用户
- ✅ 表单验证
- ✅ 错误处理
- ✅ 响应式设计

---

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.x | 用户界面框架 |
| TypeScript | 6.x | 类型安全 |
| React Router | 7.x | 路由管理 |
| Vite | 8.x | 构建工具 |
| ESLint | 9.x | 代码检查 |
| JSONPlaceholder | - | 模拟 API |

---

## 项目结构

```
react-learning/
├── src/
│   ├── components/          # 组件目录
│   │   ├── common/          # 通用组件
│   │   │   └── ErrorBoundary.tsx
│   │   └── user/            # 用户相关组件
│   │       ├── UserDetail/
│   │       │   └── index.tsx
│   │       └── UserList/
│   │           ├── index.tsx
│   │           ├── SearchBar.tsx
│   │           ├── FilterButtons.tsx
│   │           ├── UserCard.tsx
│   │           ├── EditForm.tsx
│   │           └── NewUserForm.tsx
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useUsers.ts
│   │   └── useUserDetail.ts
│   ├── services/            # API 服务
│   │   └── api.ts
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/               # 工具函数
│   │   └── validation.ts
│   ├── App.tsx              # 根组件
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 安装与运行

### 前置条件

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 生产构建

```bash
npm run build
```

### 类型检查

```bash
npm run typecheck
```

### 代码检查

```bash
npm run lint
```

---

## 学习要点

### React 基础

1. **函数组件** - 使用函数定义组件
2. **JSX** - JavaScript 的语法扩展，在 JS 中写 HTML
3. **Props** - 组件间通信
4. **State** - 组件内部状态管理

### React Hooks

1. **useState** - 管理组件状态
2. **useEffect** - 副作用处理
3. **useMemo** - 性能优化，缓存计算结果
4. **useCallback** - 缓存函数引用

### React Router

1. **BrowserRouter** - 路由容器
2. **Routes / Route** - 路由定义
3. **Link** - 导航链接
4. **useParams** - 获取 URL 参数

### TypeScript

1. **类型注解** - 为变量、函数、组件添加类型
2. **接口定义** - 定义数据结构
3. **泛型** - 可复用的类型
4. **类型安全** - 编译时类型检查

### 项目组织

1. **组件化** - 将 UI 拆分为独立组件
2. **自定义 Hooks** - 封装可复用的状态逻辑
3. **服务层** - 封装 API 请求
4. **工具函数** - 封装通用逻辑

---

## License

MIT

---

---

# React Learning (English)

A React user management system project for learning, migrated to TypeScript.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Running](#installation--running)
- [Learning Points](#learning-points)
- [License](#license)

---

## Features

- ✅ User list display
- ✅ User search functionality
- ✅ User filtering (sort by username/email)
- ✅ User detail view
- ✅ Add new user
- ✅ Edit user information
- ✅ Delete user
- ✅ Form validation
- ✅ Error handling
- ✅ Responsive design

---

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.x | UI framework |
| TypeScript | 6.x | Type safety |
| React Router | 7.x | Routing |
| Vite | 8.x | Build tool |
| ESLint | 9.x | Code linting |
| JSONPlaceholder | - | Mock API |

---

## Project Structure

```
react-learning/
├── src/
│   ├── components/          # Components directory
│   │   ├── common/          # Common components
│   │   │   └── ErrorBoundary.tsx
│   │   └── user/            # User-related components
│   │       ├── UserDetail/
│   │       │   └── index.tsx
│   │       └── UserList/
│   │           ├── index.tsx
│   │           ├── SearchBar.tsx
│   │           ├── FilterButtons.tsx
│   │           ├── UserCard.tsx
│   │           ├── EditForm.tsx
│   │           └── NewUserForm.tsx
│   ├── hooks/               # Custom Hooks
│   │   ├── useUsers.ts
│   │   └── useUserDetail.ts
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── validation.ts
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Installation & Running

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

Visit http://localhost:5173 to view the app.

### Production Build

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

---

## Learning Points

### React Basics

1. **Function Components** - Define components using functions
2. **JSX** - JavaScript syntax extension for writing HTML-like code
3. **Props** - Component communication
4. **State** - Internal component state management

### React Hooks

1. **useState** - Manage component state
2. **useEffect** - Handle side effects
3. **useMemo** - Performance optimization, cache computed results
4. **useCallback** - Cache function references

### React Router

1. **BrowserRouter** - Routing container
2. **Routes / Route** - Route definition
3. **Link** - Navigation links
4. **useParams** - Get URL parameters

### TypeScript

1. **Type Annotations** - Add types to variables, functions, components
2. **Interfaces** - Define data structures
3. **Generics** - Reusable types
4. **Type Safety** - Compile-time type checking

### Project Organization

1. **Componentization** - Split UI into independent components
2. **Custom Hooks** - Encapsulate reusable state logic
3. **Service Layer** - Encapsulate API requests
4. **Utility Functions** - Encapsulate common logic

---

## License

MIT