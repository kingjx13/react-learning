/**
 * 【应用入口文件：main.tsx】
 *
 * 本文件是 React 应用的起点，负责将 React 应用挂载到 DOM 上
 *
 * 【模块导入】
 * - import 语句用于引入其他模块（文件）中导出的内容
 * - 这些是 ES6 模块系统的一部分
 */

/** React 核心 - 必须在 React 应用中使用 */
import { StrictMode } from 'react';

/**
 * createRoot - React 18 引入的新的挂载 API
 *
 * 【React 18 新 API】
 * - ReactDOM.render() 在 React 18 中被废弃
 * - createRoot() 是新的推荐方式
 * - 支持并发渲染（Concurrent Rendering）
 */
import { createRoot } from 'react-dom/client';

/** 全局样式文件 */
import './index.css';

/** 应用根组件 */
import App from './App';

/**
 * 【获取根 DOM 元素】
 *
 * document.getElementById('root')
 * - JavaScript DOM API
 * - 获取 id="root" 的 HTML 元素
 * - 这个元素在 index.html 中定义
 *
 * 【index.html 结构】
 * <div id="root"></div>
 * 所有 React 内容都会渲染到这个 div 中
 */
const rootElement = document.getElementById('root');

/**
 * 【防御性编程】
 *
 * if (rootElement) { ... }
 * - 检查 rootElement 是否存在
 * - 如果不存在（如 id 写错了），不执行渲染
 * - 避免运行时错误
 */
if (rootElement) {
  /**
   * 【createRoot() 创建根节点】
   *
   * React 18 引入的 API
   * 创建一个 React 根容器
   * 未来可以支持多个根节点
   */
  const root = createRoot(rootElement);

  /**
   * 【root.render() 渲染应用】
   *
   * 将 App 组件渲染到 rootElement 中
   * 传入的是 JSX 语法，会被编译为 React.createElement()
   *
   * 【StrictMode 严格模式】
   * - React 16.3 引入
   * - 帮助发现组件中的问题
   * - 在开发模式下会执行额外的检查
   * - 会双重调用某些函数以检测副作用
   */
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}


/**
 * 【React 应用启动流程】
 *
 * 1. 浏览器加载 index.html
 * 2. 浏览器执行 main.tsx
 * 3. 获取 id="root" 的 DOM 元素
 * 4. 使用 createRoot 创建 React 根容器
 * 5. 调用 render() 渲染 App 组件
 * 6. App 组件被加载，包含路由配置
 * 7. React 根据 URL 渲染对应页面
 *
 * 【文件加载顺序】
 * index.html
 *   ↓
 * main.tsx（入口文件）
 *   ↓
 * App.tsx（根组件）
 *   ↓
 * 各个页面组件（UserList、UserDetail 等）
 */


/**
 * 【React 18 的改进】
 *
 * 1. 自动批处理（Automatic Batching）
 *    - 多个状态更新自动合并为一次渲染
 *    - 提高性能
 *
 * 2. 并发渲染（Concurrent Rendering）
 *    - 可以中断渲染过程
 *    - 支持 Suspense 和 Server Components
 *
 * 3. 新的 Hook
 *    - useId: 生成稳定的唯一 ID
 *    - useTransition: 标记非紧急更新
 *    - useDeferredValue: 延迟更新
 */
