/**
 * ErrorBoundary组件
 * React错误边界组件，用于捕获子组件中的JavaScript错误
 * 
 * React学习要点：
 * 1. 错误边界必须是类组件
 * 2. 使用static getDerivedStateFromError()在渲染阶段更新状态
 * 3. 使用componentDidCatch()在提交阶段记录错误信息
 * 4. 可以显示备用UI，提供更好的用户体验
 */

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  name?: string;
  errorMessage?: string;
  onError?: (error: Error, errorInfo: { componentStack?: string }) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack?: string } | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack?: string }) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  getErrorMessage(error: Error | null): string {
    if (this.props.errorMessage) {
      return this.props.errorMessage;
    }

    if (!error) return 'An unexpected error occurred. Please try again later.';

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

  render() {
    if (this.state.hasError) {
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

    return this.props.children;
  }
}

export default ErrorBoundary;