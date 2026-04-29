/**
 * 【React 自定义 Hook：useUsers】
 *
 * 本文件实现了一个用于管理用户列表数据的状态管理 Hook
 *
 * 【升级说明】
 * - 现在使用 Zustand 作为状态管理方案
 * - 保持原有的 API 接口不变
 * - 底层调用 Zustand Store
 *
 * 【什么是 React Hook？】
 * - Hook 是 React 16.8 引入的新特性
 * - 允许在函数组件中使用 state 和其他 React 特性
 * - 以 "use" 开头的函数被称为 Hook
 * - Hook 必须遵循以下规则：
 *   1. 只在 React 函数组件或自定义 Hook 中调用
 *   2. 不要在循环、条件语句或嵌套函数中调用
 *   3. 确保 Hook 的调用顺序在每次渲染中都是相同的
 *
 * 【自定义 Hook 的优势】
 * - 逻辑复用：可以将组件逻辑提取到可重用的函数中
 * - 代码组织：将相关逻辑组织在一起
 * - 测试友好：可以单独测试 Hook 的逻辑
 *
 * 【本 Hook 功能】
 * - 管理用户列表状态（通过 Zustand）
 * - 提供加载、错误状态
 * - 提供增删改查操作方法
 * - 使用 useEffect 初始化数据加载
 */

import { useEffect, useCallback } from 'react';
import { User } from '../types';
import useUserStore from './useUserStore';

/**
 * useUsers Hook
 *
 * 【Zustand Store 集成】
 * - 底层使用 useUserStore（Zustand store）
 * - 本 Hook 作为封装层，保持原有 API
 *
 * 【useEffect 概念】
 * - useEffect 是 React 内置的 Hook
 * - 用于处理副作用操作（side effects）
 * - 类似于 componentDidMount + componentDidUpdate + componentWillUnmount
 * - 第一个参数是副作用函数，第二个参数是依赖数组
 *
 * 【useCallback 概念】
 * - useCallback 是 React 内置的 Hook
 * - 用于缓存回调函数，避免不必要的重新创建
 * - 第一个参数是回调函数，第二个参数是依赖数组
 * - 当依赖变化时，才会创建新的回调函数
 *
 * @returns 包含用户数据和操作方法的对象
 */
export const useUsers = () => {
  /**
   * 【从 Zustand Store 获取状态和方法】
   *
   * 【Zustand 的选择器模式】
   * useUserStore(state => state.xxx)
   * - 只订阅特定的状态字段
   * - 只有这些字段变化时组件才会重新渲染
   * - 提高性能
   */
  const users = useUserStore(state => state.users);
  const loading = useUserStore(state => state.loading);
  const error = useUserStore(state => state.error);
  const loadUsers = useUserStore(state => state.loadUsers);
  const updateUser = useUserStore(state => state.updateUser);
  const addUser = useUserStore(state => state.addUser);
  const removeUser = useUserStore(state => state.removeUser);

  /**
   * 【useEffect - 组件挂载时加载数据】
   *
   * 【依赖数组】
   * - [] 空数组表示只在首次渲染时执行
   * - 类似于 componentDidMount
   *
   * 【useEffect 执行时机】
   * - 默认在渲染完成后执行
   * - 可以看作 componentDidMount
   */
  useEffect(() => {
    /**
     * 【加载用户数据】
     * - 首次加载时获取用户列表
     * - Zustand Store 会缓存数据
     */
    loadUsers();
  }, []);

  /**
   * 【handleUpdateUser - 更新用户包装函数】
   *
   * 【为什么包装？】
   * - 保持原有的 API 接口
   * - 组件期望的函数签名可能略有不同
   * - 可以在此处做额外的处理
   */
  const handleUpdateUser = useCallback(async (id: number, userData: Partial<User>) => {
    return await updateUser(id, userData);
  }, [updateUser]);

  /**
   * 【handleAddUser - 添加用户包装函数】
   */
  const handleAddUser = useCallback(async (userData: Partial<User>) => {
    return await addUser(userData);
  }, [addUser]);

  /**
   * 【handleDeleteUser - 删除用户包装函数】
   *
   * 注意：Zustand store 中的方法是 removeUser
   * 这里包装为 deleteUser 保持 API 一致
   */
  const handleDeleteUser = useCallback(async (id: number) => {
    await removeUser(id);
    return true;
  }, [removeUser]);

  /**
   * 【返回值】
   *
   * 返回对象包含：
   * - users: 用户列表数据
   * - loading: 加载状态
   * - error: 错误信息
   * - loadUsers: 重新加载函数
   * - handleUpdateUser: 更新用户函数
   * - handleAddUser: 添加用户函数
   * - handleDeleteUser: 删除用户函数
   *
   * 【返回值设计】
   * - 与原有 API 保持一致
   * - 使用者无需关心底层实现
   * - 未来可以轻松替换为其他状态管理方案
   */
  return {
    users,
    loading,
    error,
    loadUsers,
    handleUpdateUser,
    handleAddUser,
    handleDeleteUser
  };
};
