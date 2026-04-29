/**
 * 【应用入口组件：App】
 *
 * 本文件是 React 应用的根组件，负责整体布局和路由配置
 *
 * 【React 应用结构】
 * - index.html → main.tsx → App.tsx → 各页面组件
 * - App 是整个应用的根组件
 * - 路由配置定义了 URL 与组件的映射关系
 *
 * 【组件化架构】
 * - 整个应用由多个组件组成
 * - 组件可以嵌套，形成树形结构
 * - 数据通过 props 向下传递
 */

/**
 * 【React Router 导入说明】
 *
 * React Router 是 React 生态中最流行的路由解决方案
 * 用于实现单页应用（SPA）中的页面切换
 *
 * 【BrowserRouter (重命名为 Router)】
 * - 使用 HTML5 History API 管理浏览器历史记录
 * - 保持 UI 与 URL 同步
 * - 监听浏览器的前进/后退按钮
 *
 * 【Routes 容器组件】
 * - 包含所有 Route 组件的容器
 * - 只渲染匹配当前 URL 的第一个 Route
 *
 * 【Route 路由规则】
 * - path: URL 路径
 * - element: 要渲染的组件
 * - React Router 使用精确匹配（exact）来确定路由
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** 页面组件 */
import UserList from './components/user/UserList';
import UserDetail from './components/user/UserDetail';

/** 错误边界组件 */
import ErrorBoundary from './components/common/ErrorBoundary';

/** 应用样式文件 */
import './App.css';

/**
 * App 函数组件
 *
 * 【函数组件】
 * - React 16.8 之前，类组件是唯一可以使用 state 和生命周期的方式
 * - 函数组件是更现代、更简洁的方式
 * - 通过 Hooks（useState、useEffect 等）在函数组件中使用 React 特性
 *
 * 【JSX 语法】
 * - 返回的 HTML-like 代码就是 JSX
 * - JSX 不是 HTML，但语法相似
 * - JSX 会被编译为 React.createElement() 调用
 *
 * 【组件必须返回 JSX】
 * - React 组件必须返回要渲染的内容
 * - 返回 null 表示什么都不渲染
 * - 返回的元素必须有一个根元素（可以用 <> 代替）
 */
function App() {
  /**
   * 【错误处理回调】
   *
   * 【箭头函数】
   * (error: Error, errorInfo: {...}) => { ... }
   * - 这是 ES6 引入的简洁函数语法
   * - 自动绑定 this（但这里没用到 this）
   *
   * 【参数类型注解】
   * - TypeScript 语法
   * - error: Error - error 参数是 Error 类型
   * - errorInfo: { componentStack?: string } - 错误信息对象
   */
  const handleError = (error: Error, errorInfo: { componentStack?: string }) => {
    console.error('App level error handler:', error, errorInfo);
  };

  /**
   * 【JSX 返回】
   *
   * React 使用 JSX 来描述 UI 结构
   * JSX 看起来像 HTML，但有以下区别：
   * - className 代替 class
   * - 事件处理使用 camelCase（如 onClick）
   * - 使用 {} 嵌入 JavaScript 表达式
   */
  return (
    /**
     * 【ErrorBoundary 错误边界】
     *
     * 错误边界是一种特殊组件，可以捕获子组件的错误
     * 如果 App 内部的任何组件发生错误
     * ErrorBoundary 会捕获并显示友好的错误 UI
     *
     * 【Props 传递】
     * - name="AppErrorBoundary" - 给这个边界起个名字
     * - onError={handleError} - 传递错误回调函数
     * - ErrorBoundary 标签内的所有内容都是它的 children
     */
    <ErrorBoundary name="AppErrorBoundary" onError={handleError}>
      {/**
       * 【Router 路由容器】
       *
       * BrowserRouter 必须在最外层
       * 它提供了路由上下文
       * 所有路由相关组件（Route、Link、useParams 等）都必须在其内部
       */}
      <Router>
        {/**
         * 【div.app 根容器】
         *
         * 所有页面内容包裹在一个 div 中
         * className="app" 用于样式定位
         */}
        <div className="app">
          {/**
           * 【Routes 和 Route】
           *
           * Routes 容器包含所有路由规则
           * 每个 Route 定义：
           * - path: URL 路径（/ 表示根路径，/user/:id 表示用户详情页）
           * - element: 要渲染的组件
           *
           * 【动态路由参数 :id】
           * - :id 表示动态参数
           * - 实际 URL 可能是 /user/1、/user/2 等
           * - 组件内可以通过 useParams() 获取这个参数
           */}
          <Routes>
            {/**
             * 【Route 路由规则】
             *
             * path="/" - 根路径
             * element={<UserList />} - 渲染用户列表组件
             */}
            <Route path="/" element={<UserList />} />

            {/**
             * 【动态路由】
             *
             * path="/user/:id" - 匹配 /user/1、/user/abc 等
             * :id 是路由参数，可在组件中获取
             */}
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

/**
 * 【模块导出】
 *
 * 【export default】
 * - 默认导出，每个模块只能有一个
 * - 导入时可以使用任意名称
 * - 语法：import App from './App'
 *
 * 【导入方式】
 * - 默认导出：import App from './App'
 * - 命名导出：import { App } from './App'（需要 export const App）
 *
 * 【main.tsx 中的使用】
 * import App from './App'
 * <App />
 */
export default App;


/**
 * 【React 路由的工作原理】
 *
 * 1. 用户访问 URL
 * 2. BrowserRouter 监听 URL 变化
 * 3. Routes 查找匹配的 Route
 * 4. 匹配到的 Route 渲染对应的组件
 * 5. 组件使用 useParams、useLocation 等 Hook 获取路由信息
 *
 * 【使用示例】
 *
 * // UserList.tsx 中点击用户
 * <Link to={`/user/${user.id}`}>查看详情</Link>
 *
 * // UserDetail.tsx 中获取用户 ID
 * const { id } = useParams<{ id: string }>();
 * // id 就是 URL 中的动态参数
 */
