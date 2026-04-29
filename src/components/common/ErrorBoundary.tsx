/**
 * ErrorBoundary 组件 - React 错误边界
 *
 * 【React 核心概念：什么是错误边界？】
 * ----------------------------------------
 * 错误边界是 React 16 引入的一种特殊组件，用于捕获子组件树中的
 * JavaScript 错误。这些错误会导致 React 的内部状态被破坏，并生成
 * 一个导致整个组件树崩溃的错误。
 *
 * 【为什么需要错误边界？】
 * - 以前，JavaScript 错误会导致整个 React 应用崩溃
 * - 错误边界可以阻止这种情况，只显示备用 UI
 * - 提供更好的用户体验，而不是让用户看到空白页面
 *
 * 【错误边界的限制】
 * - 只能捕获【子组件】的错误，不能捕获自身错误
 * - 只能捕获【渲染阶段】的错误，不能捕获事件处理、异步代码等错误
 * - 必须是【类组件】，不能是函数组件（React 18 之前）
 *
 * 【React 类组件生命周期】
 * 1. constructor() - 构造函数，初始化 state
 * 2. render() - 渲染组件
 * 3. componentDidMount() - 组件挂载后执行
 * 4. componentDidUpdate() - 组件更新后执行
 * 5. componentWillUnmount() - 组件卸载前执行
 *
 * 【错误边界专用生命周期】
 * 1. static getDerivedStateFromError() - 渲染阶段调用，用于更新 state
 * 2. componentDidCatch() - 提交阶段调用，用于记录错误信息
 */

import React from 'react';

/**
 * 【TypeScript 接口定义】
 *
 * 接口用于定义 TypeScript 中的类型约束，类似于其他语言中的"接口"或"协议"
 * 这不是 React 特有的概念，但 React 组件经常使用接口来约束 props 和 state
 */

/**
 * ErrorBoundaryProps - ErrorBoundary 组件的 props 类型定义
 *
 * 【React Props 概念】
 * - Props 是组件的输入参数，从父组件传递给子组件
 * - Props 是只读的，组件不应该修改自己的 props
 * - 通过 props，组件可以接收回调函数、数据等
 *
 * React.ReactNode - 表示任何有效的 React 儿童节点
 * - 可以是 React 元素（<div>、<MyComponent />）
 * - 可以是字符串（"Hello"）
 * - 可以是数字（42）
 * - 可以是 null 或 undefined
 * - 可以是这些类型的数组
 */
interface ErrorBoundaryProps {
  /** React.ReactNode - 要渲染的子组件，错误边界会捕获这些子组件的错误 */
  children: React.ReactNode;

  /** 可选 - 给这个错误边界起个名字，方便调试时识别是哪个边界出错 */
  name?: string;

  /** 可选 - 自定义错误消息，如果提供则优先显示这个消息 */
  errorMessage?: string;

  /**
   * 可选 - 错误回调函数，当捕获到错误时会调用这个函数
   * 常用于：
   * - 将错误信息发送到错误追踪服务（如 Sentry）
   * - 在开发环境输出到控制，生产环境上报到服务器
   *
   * @param error - 捕获到的 Error 对象
   * @param errorInfo - 包含 componentStack 属性，描述错误发生的位置
   */
  onError?: (error: Error, errorInfo: { componentStack?: string }) => void;
}

/**
 * ErrorBoundaryState - ErrorBoundary 组件的 state 类型定义
 *
 * 【React State 概念】
 * - State 是组件的内部数据，用于存储组件的状态信息
 * - State 的改变会触发组件重新渲染
 * - 应该使用 setState() 方法来修改 state，不要直接修改
 *
 * 【类组件的泛型参数】
 * <ErrorBoundaryProps, ErrorBoundaryState> 表示：
 * - 第一个泛型参数是 props 的类型
 * - 第二个泛型参数是 state 的类型
 */
interface ErrorBoundaryState {
  /** hasError - 是否有错误发生，用于控制显示错误 UI 还是正常 UI */
  hasError: boolean;

  /** error - 捕获到的错误对象，包含错误信息和堆栈跟踪 */
  error: Error | null;

  /** errorInfo - 错误的详细信息，包含组件堆栈信息 */
  errorInfo: { componentStack?: string } | null;
}

/**
 * ErrorBoundary 类组件
 *
 * 【类组件 vs 函数组件】
 * - 类组件使用 ES6 class 语法，继承自 React.Component
 * - 函数组件是一个接收 props 并返回 JSX 的函数
 * - React 18 后，函数组件可以通过 hooks 实现同样的功能
 * - 但错误边界必须使用类组件（React 18 也无法改变这一点）
 *
 * 【为什么要继承 React.Component？】
 * - React.Component 提供了内部方法，如 setState、forceUpdate
 * - 提供了生命周期方法的调用机制
 * - 管理 props 和 state 的响应式系统
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * 【constructor 构造函数】
   *
   * 这是类组件的初始化方法，在组件创建时首先被调用
   *
   * 【super(props) 的重要性】
   * - JavaScript 要求在访问 this 之前先调用 super()
   * - super() 会调用 React.Component 的构造函数
   * - 只有调用 super(props) 后，才能使用 this.props
   *
   * 【初始化 state】
   * - 在 constructor 中直接 this.state = {...} 是初始化 state 的方式之一
   * - 初始状态表示组件正常，没有错误
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    /**
     * 初始化 state：
     * - hasError: false - 初始时没有错误
     * - error: null - 初始时没有错误对象
     * - errorInfo: null - 初始时没有错误信息
     */
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  /**
   * 【static getDerivedStateFromError() - 静态错误处理方法】
   *
   * 【React 生命周期：错误处理阶段】
   * 此方法在"渲染阶段"被调用，这意味着它会在 DOM 更新之前执行
   *
   * 【为什么是静态方法？】
   * - 静态方法不需要访问组件实例（this）
   * - React 在调用此方法时，组件实例可能还未创建
   * - 这种设计确保了错误处理的稳定性
   *
   * 【使用场景】
   * - 主要用于更新 state，触发备用 UI 的渲染
   * - 不要在此方法中进行副作用操作（如 API 调用）
   * - 副作用操作应该放在 componentDidCatch 中
   *
   * 【参数】
   * @param error - 抛出的错误对象
   * @returns 返回要合并到 state 中的部分对象
   *
   * 【返回值】
   * - 返回 { hasError: true, error } 来更新 state
   * - 返回 null 表示不需要更新 state
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    /**
     * React 会将返回的对象与当前 state 进行浅合并
     * 这等价于调用 this.setState({ hasError: true, error })
     */
    return { hasError: true, error };
  }

  /**
   * 【componentDidCatch() - 错误捕获方法】
   *
   * 【React 生命周期：提交阶段】
   * 此方法在"提交阶段"被调用，此时错误已经被处理完毕
   * 组件已经尝试渲染，DOM 可能已经更新
   *
   * 【与 getDerivedStateFromError 的区别】
   * | 特性         | getDerivedStateFromError | componentDidCatch |
   * |-------------|------------------------|-------------------|
   * | 调用时机     | 渲染阶段                | 提交阶段          |
   * | 返回值       | 用于更新 state          | 返回 undefined    |
   * | 能做副作用？  | 不能                    | 能                |
   * | DOM 已更新？ | 否                      | 是                |
   *
   * 【使用场景】
   * - 记录错误日志到服务器
   * - 触发错误上报到错误追踪服务
   * - 显示错误提示给用户
   * - 进行任何需要 DOM 已存在的操作
   *
   * @param error - 抛出的错误对象
   * @param errorInfo - 包含 componentStack 属性，描述错误位置
   */
  componentDidCatch(error: Error, errorInfo: { componentStack?: string }) {
    /**
     * 【console.error vs console.log】
     * - console.error 会输出错误样式，更醒目
     * - 可以帮助开发者在控制台快速定位问题
     * - 生产环境应该移除或替换为错误上报服务
     */
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    /**
     * 【setState 的异步性】
     * - setState 可以接受两个参数：Partial<State> 和可选的回调函数
     * - React 可能会批量处理多个 setState 调用
     * - 第二个参数（回调函数）会在 state 更新完成后执行
     */
    this.setState({ errorInfo });

    /**
     * 【可选链操作符 ?.】
     * - this.props.onError?.() 等价于 this.props.onError && this.props.onError()
     * - 如果 onError 存在则调用，否则不调用
     * - 避免在没有提供 onError 时报错
     */
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * 【辅助方法：错误消息处理】
   *
   * 这是组件自己定义的方法，用于根据错误类型返回友好的错误消息
   *
   * 【方法命名约定】
   * - React 组件的公共方法通常以大写字母开头（React 风格）
   * - 私有/辅助方法可以用小写字母开头
   * - 或者使用 get 前缀表示"获取"（getErrorMessage）
   *
   * @param error - 错误对象，可以为 null
   * @returns 友好的错误消息字符串
   */
  getErrorMessage(error: Error | null): string {
    /**
     * 【条件判断顺序很重要】
     * 先检查 props.errorMessage，如果用户提供了自定义消息，就直接使用
     * 这样用户可以覆盖默认的错误消息
     */
    if (this.props.errorMessage) {
      return this.props.errorMessage;
    }

    if (!error) return 'An unexpected error occurred. Please try again later.';

    /**
     * 【instanceof 操作符】
     * 用于检查对象是否是某个类的实例
     * 常见错误类型：
     * - TypeError: 类型错误，如调用 undefined 的方法
     * - ReferenceError: 引用错误，如使用未定义的变量
     * - SyntaxError: 语法错误，通常在代码解析阶段就会失败
     * - RangeError: 范围错误，如数组索引越界
     * - Error: 基类，所有具体错误类型都继承自它
     */
    if (error instanceof TypeError) {
      return 'A type error occurred. Please check your data types and try again.';
    } else if (error instanceof ReferenceError) {
      return 'A reference error occurred. Please check your code for undefined variables.';
    } else if (error instanceof SyntaxError) {
      return 'A syntax error occurred. Please check your code for syntax issues.';
    } else if (error.message.includes('fetch')) {
      return 'A network error occurred. Please check your internet connection and try again.';
    } else {
      return 'An unexpected error occurred. Please try again later.';
    }
  }

  /**
   * 【render() - 渲染方法】
   *
   * 【React 组件的核心方法】
   * render() 是 React 类组件唯一必须实现的方法
   * 它描述了组件想要渲染什么
   *
   * 【render() 的要求】
   * - 必须返回一个 React 元素（JSX）或 null
   * - 必须是纯函数：相同 props 总是返回相同结果
   * - 不要在此方法中修改组件 state
   * - 不要在此方法中进行 API 调用或其他副作用
   *
   * 【React 元素】
   * JSX 经过编译后会变成 React.createElement() 调用
   * 例如：<div>Hello</div> 会变成 React.createElement('div', null, 'Hello')
   *
   * 【条件渲染】
   * 下面的代码展示了 React 的条件渲染模式：
   * - 使用 if 语句根据 state.hasError 判断渲染什么
   */
  render() {
    /**
     * 【条件渲染：显示错误 UI 或正常 UI】
     *
     * React 的条件渲染方式有多种：
     * 1. if 语句（这里使用的方式）
     * 2. 三元运算符：condition ? <A /> : <B />
     * 3. && 运算符：condition && <A />
     * 4. 早期退出模式：先处理特殊情况
     */

    if (this.state.hasError) {
      const boundaryName = this.props.name || 'ErrorBoundary';
      const errorMessage = this.getErrorMessage(this.state.error);

      /**
       * 【JSX 语法】
       * - JSX 是 JavaScript 的语法扩展，看起来像 HTML
       * - 在 React 中用于描述 UI 的结构
       * - JSX 中的 className 对应 HTML 的 class（因为 class 是 JavaScript 关键字）
       * - JSX 中的 htmlFor 对应 HTML 的 for（因为 for 是 JavaScript 关键字）
       *
       * 【JSX 与 HTML 的区别】
       * - className vs class
       * - htmlFor vs for
       * - 所有标签必须闭合：<div></div> 或 <img />
       * - 属性使用 camelCase：onClick, onChange, maxLength
       * - 表达式用 {} 包裹：{variable}, {expression}
       */
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>

          {/**
           * 【CSS 类名】
           * React 中推荐使用 CSS Modules 或 CSS-in-JS 方案
           * 但也可以使用传统的 CSS 文件
           * 这里的 className 用于样式控制
           */}
          <div className="error-details">
            <h3>Error Details:</h3>
            <p><strong>Boundary:</strong> {boundaryName}</p>
            <p><strong>Error:</strong> {this.state.error?.toString()}</p>

            {/**
             * 【React 的 && 运算符条件渲染】
             * 当条件为 true 时，渲染后面的元素
             * 当条件为 false 时，不渲染任何东西
             *
             * 【可选链 ?.】
             * this.state.errorInfo?.componentStack
             * 等价于：this.state.errorInfo && this.state.errorInfo.componentStack
             * 如果 errorInfo 为 null 或 undefined，不会报错
             */}

            {this.state.errorInfo && (
              <details>
                {/**
                 * 【details 和 summary 元素】
                 * 这是 HTML5 的折叠/展开元素
                 * <details> 包含可折叠的内容
                 * <summary> 是折叠块的标题，点击可以展开/收起
                 */}
                <summary>Component Stack</summary>

                {/**
                 * 【pre 元素】
                 * 保留空白和换行，常用于显示代码或格式化的文本
                 * 堆栈信息包含多行，需要 pre 来保持格式
                 */}
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>

          {/**
           * 【事件处理：onClick】
           *
           * React 中的事件处理使用 camelCase 命名：
           * - onClick（不是 onclick）
           * - onChange（不是 onchange）
           * - onSubmit（不是 onsubmit）
           *
           * 【箭头函数 vs 方法引用】
           * onClick={() => this.setState(...)} 是箭头函数
           * onClick={this.handleClick} 是方法引用
           *
           * 箭头函数每次渲染都会创建新函数，适合需要传递参数的情况
           * 方法引用更高效，但需要 bind 或使用箭头函数定义方法
           */}
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="retry-button"
          >
            {/**
             * 【JSX 中的文本】
             * 放在标签内的文本直接书写即可
             * 不需要引号包裹（那会是字符串）
             */}
            Try Again
          </button>
        </div>
      );
    }

    /**
     * 【渲染子组件】
     *
     * this.props.children 是 React 的一个特殊 prop
     * 它表示组件的子元素，即写在 <ErrorBoundary> 和 </ErrorBoundary> 之间的内容
     *
     * 【children 的用途】
     * - 实现布局组件：<Layout><main>内容</main></Layout>
     * - 实现插槽组件：<Card><Image /><Text /></Card>
     * - 实现透明组件：直接渲染 children
     *
     * 【React.cloneElement】
     * 如果需要修改 children 的 props，可以使用 React.cloneElement()
     * 这在 HOC（高阶组件）中常用
     */
    return this.props.children;
  }
}

/**
 * 【模块导出】
 *
 * 【export default】
 * - 默认导出，每个模块只能有一个
 * - 导入时可以起任意名字
 * - 语法：import MyComponent from './MyComponent'
 *
 * 【命名导出】
 * - 可以有多个
 * - 导入时必须使用原名
 * - 语法：import { MyComponent } from './MyComponent'
 *
 * 【两者对比】
 * | 特性     | export default | export |
 * |---------|----------------|--------|
 * | 数量     | 每个模块1个     | 多个   |
 * | 导入名   | 可以自定义      | 必须原名 |
 * | 导入方式 | import X       | import { X } |
 */
export default ErrorBoundary;


/**
 * 【组件使用示例】
 *
 * <ErrorBoundary name="UserProfileBoundary" errorMessage="用户信息加载失败">
 *   <UserProfile userId={123} />
 * </ErrorBoundary>
 *
 * 或配合错误追踪服务：
 *
 * <ErrorBoundary
 *   name="ProductBoundary"
 *   onError={(error, info) => {
 *     // 发送到 Sentry
 *     Sentry.captureException(error, { extra: info });
 *     // 或者发送到自己的服务器
 *     fetch('/api/errors', {
 *       method: 'POST',
 *       body: JSON.stringify({ error: error.message, stack: info.componentStack })
 *     });
 *   }}
 * >
 *   <ProductList />
 * </ErrorBoundary>
 */
