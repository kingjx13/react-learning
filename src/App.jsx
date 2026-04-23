/**
 * React Router 导入说明：
 * - BrowserRouter: 使用HTML5 History API保持UI与URL同步
 * - Routes: 包含所有Route的容器组件
 * - Route: 定义路由规则，将URL路径映射到组件
 *
 * React学习要点：
 * 1. React使用声明式编程，描述UI应该是什么样子
 * 2. 组件是React应用的基本构建块
 * 3. 路由允许我们在单页应用中创建多个"页面"
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserList from './components/user/UserList'
import UserDetail from './components/user/UserDetail'
import ErrorBoundary from './components/common/ErrorBoundary'
import './App.css'

/**
 * App组件 - 应用的根组件
 *
 * React学习要点：
 * 1. 函数组件：现代React推荐的方式，使用函数定义组件
 * 2. JSX：JavaScript的语法扩展，允许在JS中写HTML-like代码
 * 3. 组件必须返回JSX并只返回一个根元素（如需要多个元素，用<>...</>或<div>包裹）
 */

function App() {
  // 错误处理回调函数
  const handleError = (error, errorInfo) => {
    console.error('App level error handler:', error, errorInfo);
    // 这里可以添加错误上报逻辑，如发送到错误监控服务
  };

  return (
    <ErrorBoundary name="AppErrorBoundary" onError={handleError}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

// 导出组件供其他文件使用
// React学习要点：每个文件可以有一个默认导出（export default）
export default App