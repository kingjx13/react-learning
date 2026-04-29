# React Learning

一个用于学习 React 的用户管理系统项目，已迁移到 TypeScript，并引入 Zustand 作为状态管理方案。

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
- ✅ 全局状态管理（Zustand）
- ✅ 数据缓存与共享

---

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.x | 用户界面框架 |
| TypeScript | 6.x | 类型安全 |
| React Router | 7.x | 路由管理 |
| Zustand | 最新 | 轻量级状态管理 |
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
│   │   │   └── ErrorBoundary.tsx  # 错误边界组件
│   │   └── user/            # 用户相关组件
│   │       ├── UserDetail/
│   │       │   └── index.tsx       # 用户详情页
│   │       └── UserList/
│   │           ├── index.tsx        # 用户列表页（主页面）
│   │           ├── SearchBar.tsx     # 搜索栏组件
│   │           ├── FilterButtons.tsx # 筛选按钮组件
│   │           ├── UserCard.tsx      # 用户卡片组件
│   │           ├── EditForm.tsx      # 编辑表单组件
│   │           └── NewUserForm.tsx   # 新建用户表单组件
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useUsers.ts      # 用户列表 Hook
│   │   ├── useUserDetail.ts # 用户详情 Hook
│   │   └── useUserStore.ts  # Zustand 全局状态管理
│   ├── services/            # API 服务
│   │   └── api.ts           # REST API 封装
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts         # 类型接口定义
│   ├── utils/               # 工具函数
│   │   └── validation.ts    # 表单验证函数
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

1. **函数组件** - 使用函数定义组件，现代 React 推荐方式
2. **JSX** - JavaScript 的语法扩展，在 JS 中写 HTML
3. **Props** - 组件间数据传递
4. **State** - 组件内部状态管理
5. **条件渲染** - 根据状态显示不同内容
6. **列表渲染** - 使用 map 渲染列表

### React Hooks

1. **useState** - 管理组件状态
2. **useEffect** - 副作用处理（数据获取、订阅等）
3. **useMemo** - 性能优化，缓存计算结果
4. **useCallback** - 缓存函数引用，避免不必要的重新创建

### 状态管理

1. **Zustand** - 轻量级状态管理方案
   - `create()` - 创建 Store
   - `useStore()` - 在组件中使用
   - 选择器模式 - 按需订阅状态
   - 函数式更新 - 基于当前状态计算新状态
2. **自定义 Hooks** - 封装可复用的状态逻辑
3. **Props 传递** - 父子组件间数据流动

### React Router

1. **BrowserRouter** - 路由容器，使用 HTML5 History API
2. **Routes / Route** - 路由定义与匹配
3. **Link** - 声明式导航，不刷新页面
4. **useParams** - 获取 URL 中的动态参数

### TypeScript

1. **类型注解** - 为变量、函数、组件添加类型
2. **接口定义** - 定义对象和组件的结构
3. **泛型** - 创建可复用的组件和函数
4. **类型安全** - 编译时类型检查，减少运行时错误
5. **联合类型** - 如 `'all' | 'username' | 'email'`
6. **可选链** - `?.` 安全访问嵌套属性

### Zustand 状态管理

1. **Store 创建**
   ```typescript
   const useStore = create((set) => ({
     // 状态
     users: [],
     loading: false,
     // 操作
     loadUsers: async () => {
       const users = await fetchUsers();
       set({ users });
     }
   }));
   ```

2. **在组件中使用**
   ```typescript
   // 方式 1：解构获取多个状态
   const { users, loading, loadUsers } = useStore();

   // 方式 2：选择器（推荐，性能更好）
   const users = useStore(state => state.users);
   ```

3. **不可变性**
   - 使用展开运算符 `...` 创建新对象
   - 不直接修改状态

4. **中间件（进阶）**
   ```typescript
   import { persist } from 'zustand/middleware';

   const useStore = create(
     persist(
       (set) => ({ ... }),
       { name: 'storage-key' }
     )
   );
   ```

### 项目组织原则

1. **组件化** - 将 UI 拆分为独立、可复用的组件
2. **单一职责** - 每个组件只负责一个功能
3. **状态提升** - 共享状态提升到最近公共父组件
4. **自定义 Hooks** - 封装可复用的状态逻辑
5. **服务层** - 封装 API 请求，与组件解耦
6. **工具函数** - 封装通用逻辑，提高复用性

---

## License

MIT

---

---

# React Learning (English)

A React user management system project for learning React, TypeScript, and Zustand state management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation \& Running](#installation--running)
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
- ✅ Global state management (Zustand)
- ✅ Data caching and sharing

---

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.x | UI framework |
| TypeScript | 6.x | Type safety |
| React Router | 7.x | Routing |
| Zustand | latest | Lightweight state management |
| Vite | 8.x | Build tool |
| ESLint | 9.x | Linting |
| JSONPlaceholder | - | Mock API |

---

## Learning Points

### React Basics

1. **Functional Components** - Modern React approach
2. **JSX** - HTML-like syntax in JavaScript
3. **Props** - Data passing between components
4. **State** - Internal component state
5. **Conditional Rendering** - Display content based on state
6. **List Rendering** - Using map for lists

### React Hooks

1. **useState** - Manage component state
2. **useEffect** - Handle side effects
3. **useMemo** - Cache expensive calculations
4. **useCallback** - Memoize functions

### State Management

1. **Zustand** - Lightweight state management
   - `create()` - Create store
   - `useStore()` - Use in components
   - Selector pattern - Subscribe to specific state
2. **Custom Hooks** - Encapsulate reusable logic
3. **Props Drilling** - Data flow between components

### React Router

1. **BrowserRouter** - Route container
2. **Routes / Route** - Route definitions
3. **Link** - Declarative navigation
4. **useParams** - Get URL parameters

### TypeScript

1. **Type Annotations** - Add types to variables and functions
2. **Interfaces** - Define data structures
3. **Generics** - Create reusable components
4. **Type Safety** - Compile-time checking

---

## License

MIT
