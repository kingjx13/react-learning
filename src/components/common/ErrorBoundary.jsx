/**
 * ErrorBoundary组件
 * 捕获子组件的错误，防止整个应用崩溃
 * 
 * 优化说明：
 * 1. 提供全局错误处理机制
 * 2. 向用户展示友好的错误信息
 * 3. 提高应用的稳定性和用户体验
 * 4. 支持自定义错误边界名称，便于定位问题
 * 5. 支持错误回调，允许父组件处理错误
 * 6. 根据错误类型显示不同的错误信息
 * 
 * 为什么使用Class组件而不是函数式组件：
 * 
 * React的错误边界机制依赖于Class组件特有的生命周期方法：
 * 1. static getDerivedStateFromError(error) - 静态方法，用于在捕获到错误后更新组件状态
 * 2. componentDidCatch(error, errorInfo) - 实例方法，用于捕获错误信息并进行日志记录
 * 
 * 函数式组件无法实现错误边界，因为：
 * 1. 函数式组件没有getDerivedStateFromError和componentDidCatch这两个生命周期方法
 * 2. 虽然React 16.8+引入了Hooks，但目前没有对应的Hook来实现错误边界功能
 * 3. 错误边界需要在组件树渲染过程中捕获错误，这需要特殊的生命周期支持
 * 
 * 这是React框架的设计决定，在错误边界这种特殊场景下，Class组件是必要的选择。
 */

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // 更新状态，下次渲染时显示错误UI
    // 这个静态方法在渲染阶段调用，用于更新状态
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    // 这个方法在提交阶段调用，用于记录错误信息
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // 调用父组件传入的错误回调（如果有的话）
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  // 根据错误类型获取错误信息
  getErrorMessage(error) {
    if (this.props.errorMessage) {
      return this.props.errorMessage;
    }

    // 根据错误类型返回不同的错误信息
    if (error instanceof TypeError) {
      return 'A type error occurred. Please check your data types and try again.';
    } else if (error instanceof ReferenceError) {
      return 'A reference error occurred. Please check your code for undefined variables.';
    } else if (error instanceof SyntaxError) {
      return 'A syntax error occurred. Please check your code for syntax issues.';
    } else if (error instanceof NetworkError || error.message.includes('fetch')) {
      return 'A network error occurred. Please check your internet connection and try again.';
    } else {
      return 'An unexpected error occurred. Please try again later.';
    }
  }

  render() {
    if (this.state.hasError) {
      // 自定义错误UI
      const boundaryName = this.props.name || 'ErrorBoundary';
      const errorMessage = this.getErrorMessage(this.state.error);
      
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
          
          <div className="error-details">
            <h3>Error Details:</h3>
            <p><strong>Boundary:</strong> {boundaryName}</p>
            <p><strong>Error:</strong> {this.state.error?.toString()}</p>
            
            {this.state.errorInfo && (
              <details>
                <summary>Component Stack</summary>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>
          
          <button 
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      );
    }

    // 正常渲染子组件
    return this.props.children;
  }
}

export default ErrorBoundary;