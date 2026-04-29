/**
 * 【API 服务模块】
 *
 * 本文件封装了与 JSONPlaceholder REST API 的所有通信
 *
 * 【模块化架构】
 * - 将 API 调用集中在一个文件中
 * - 便于管理和修改
 * - 符合单一职责原则
 *
 * 【REST API 概念】
 * - REST (Representational State Transfer) 是一种 API 设计风格
 * - 使用 HTTP 方法：GET（获取）、POST（创建）、PUT（更新）、DELETE（删除）
 * - URL 路径表示资源：/users、/users/1
 *
 * 【JSONPlaceholder API】
 * - 免费的在线 REST API
 * - 用于测试和原型开发
 * - 返回模拟的 JSON 数据
 * - 文档：https://jsonplaceholder.typicode.com/
 */

import { User } from '../types';

/**
 * API 基础 URL
 *
 * 【常量命名约定】
 * - 全大写 + 下划线分隔是常量的命名风格
 * - 便于识别和区分
 */
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch API 选项接口
 *
 * 【TypeScript 接口定义】
 * - method: HTTP 方法，默认为 'GET'
 * - headers: 请求头对象
 * - body: 请求体数据（字符串）
 *
 * 【Record<string, string> 类型】
 * - 表示键为字符串，值也为字符串的对象
 * - 等价于 { [key: string]: string }
 */
interface FetchApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

/**
 * fetchApi - 封装 Fetch API 的通用函数
 *
 * 【Fetch API 概念】
 * - 浏览器内置的 HTTP 请求 API
 * - 返回 Promise，支持 async/await
 * - 可以发送各种类型的 HTTP 请求
 *
 * 【泛型函数 <T>】
 * - <T> 表示这是一个泛型函数
 * - T 是类型参数，由调用者指定
 * - 使函数可以返回不同类型的数据
 *
 * @param endpoint - API 端点，如 '/users'、'/users/1'
 * @param options - fetch 选项，如 method、headers、body
 * @returns 解析后的 JSON 数据，类型为 T
 */
async function fetchApi<T>(endpoint: string, options: FetchApiOptions = {}): Promise<T> {
  try {
    /**
     * 【fetch 函数】
     * - 第一个参数是完整 URL
     * - 第二个参数是选项对象
     */

    /**
     * 【模板字符串】
     * - 使用反引号 `...`
     * - ${variable} 插入变量
     * - 便于拼接 URL
     */
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      /**
       * 【Fetch 选项】
       * - headers: 请求头
       * - ...options: 展开其他选项
       * - 使用解构赋值合并默认 headers
       */
      headers: {
        'Content-Type': 'application/json',  // 告诉服务器发送的是 JSON
        ...options.headers,  // 允许覆盖默认 headers
      },
      ...options,  // 展开 method、body 等选项
    });

    /**
     * 【response.ok 检查】
     * - response.ok 为 true 表示状态码在 200-299 范围
     * - 否则表示请求失败
     */
    if (!response.ok) {
      /**
       * 【模板字符串】
       * 使用反引号和 ${} 插入变量
       */
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    /**
     * 【response.json()】
     * - 解析响应体为 JSON
     * - 返回 Promise<T>
     */
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;  // 重新抛出错误，让调用者处理
  }
}

/**
 * fetchUsers - 获取所有用户列表
 *
 * 【GET 请求】
 * - HTTP 方法：GET
 * - 用于获取资源列表
 * - 不需要请求体
 *
 * @returns Promise<User[]> - 用户数组
 */
export const fetchUsers = async (): Promise<User[]> => {
  return fetchApi<User[]>('/users');
};

/**
 * fetchUserDetail - 获取单个用户详情
 *
 * 【路径参数】
 * - URL 中的 :id 是动态路径参数
 * - 实际请求会变成 /users/1、/users/2 等
 *
 * 【参数验证】
 * - 检查 ID 是否存在
 * - 如果不存在，抛出错误
 *
 * @param id - 用户 ID（字符串形式）
 * @returns Promise<User> - 用户对象
 */
export const fetchUserDetail = async (id: string | undefined): Promise<User> => {
  if (!id) throw new Error('User ID is required');
  return fetchApi<User>(`/users/${id}`);
};

/**
 * updateUser - 更新用户信息
 *
 * 【PUT 请求】
 * - HTTP 方法：PUT
 * - 用于更新现有资源
 * - 需要请求体包含要更新的字段
 *
 * 【Partial<User> 类型】
 * - 表示 User 类型的部分字段
 * - 可以只更新 name、email 等特定字段
 * - 不需要提供所有字段
 *
 * @param id - 要更新的用户 ID
 * @param data - 部分用户数据
 * @returns Promise<User> - 更新后的用户对象
 */
export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  return fetchApi<User>(`/users/${id}`, {
    method: 'PUT',  // 指定 HTTP 方法为 PUT
    body: JSON.stringify(data),  // 将对象转换为 JSON 字符串
  });
};

/**
 * createUser - 创建新用户
 *
 * 【POST 请求】
 * - HTTP 方法：POST
 * - 用于创建新资源
 * - 服务器会分配新的 ID
 *
 * 【JSON.stringify】
 * - 将 JavaScript 对象转换为 JSON 字符串
 * - 请求体必须是字符串
 *
 * @param data - 新用户数据
 * @returns Promise<User> - 创建的用户对象（带新 ID）
 */
export const createUser = async (data: Partial<User>): Promise<User> => {
  return fetchApi<User>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * deleteUser - 删除用户
 *
 * 【DELETE 请求】
 * - HTTP 方法：DELETE
 * - 用于删除资源
 * - 通常不需要请求体
 *
 * 【void 返回类型】
 * - 表示函数没有返回值
 * - 或返回 null/undefined
 *
 * @param id - 要删除的用户 ID
 * @returns Promise<void> - 操作完成
 */
export const deleteUser = async (id: number): Promise<void> => {
  await fetchApi(`/users/${id}`, {
    method: 'DELETE',
  });
};
