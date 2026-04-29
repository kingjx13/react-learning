/**
 * 【React 自定义 Hook：useUserDetail】
 *
 * 本文件实现了一个用于获取和显示单个用户详情的 Hook
 *
 * 【升级说明】
 * - 现在使用 Zustand 作为状态管理方案
 * - 保持原有的 API 接口不变
 * - 底层调用 Zustand Store
 *
 * 【自定义 Hook 的设计原则】
 * - 每个 Hook 专注于一个功能
 * - 将相关逻辑组织在一起
 * - 提供清晰的接口给使用者
 *
 * 【本 Hook 功能】
 * - 根据用户 ID 获取用户详情
 * - 提供加载状态和错误处理
 * - 支持重新加载数据
 */

import { useEffect, useCallback } from 'react';
import { User } from '../types';
import useUserStore from './useUserStore';

/**
 * useUserDetail Hook
 *
 * 【Zustand Store 集成】
 * - 底层使用 useUserStore（Zustand store）
 * - 本 Hook 作为封装层，保持原有 API
 *
 * @param userId - URL 中的用户 ID 参数
 * @returns 包含用户详情、加载状态和错误信息的对象
 */
export const useUserDetail = (userId: string | undefined) => {
  /**
   * 【从 Zustand Store 获取状态和方法】
   *
   * 【按需订阅】
   * - users 是完整的用户列表
   * - 从列表中查找当前用户
   * - 这样可以共享用户数据，避免重复请求
   */
  const users = useUserStore(state => state.users);
  const loading = useUserStore(state => state.loading);
  const error = useUserStore(state => state.error);
  const selectUser = useUserStore(state => state.selectUser);

  /**
   * 【根据 userId 查找缓存的用户】
   *
   * 【数据共享】
   * - 如果用户已在全局状态中（从列表页跳转）
   * - 可以直接使用，无需重新请求
   * - 这是 Zustand 的优势之一
   */
  const cachedUser = users.find(user => user.id === Number(userId)) || null;

  /**
   * 【loadUserDetail - 加载用户详情】
   *
   * 【useCallback 缓存】
   * - 确保函数引用稳定
   * - 配合 useEffect 避免无限循环
   */
  const loadUserDetail = useCallback(async (id: string | undefined) => {
    if (!id) return;
    await selectUser(id);
  }, [selectUser]);

  /**
   * 【useEffect - 监听 userId 变化】
   *
   * 【依赖数组】
   * - userId 变化 → 触发加载新用户数据
   * - loadUserDetail 变化 → 但由于 useCallback，引用稳定
   */
  useEffect(() => {
    /**
     * 【优化：如果有缓存的用户，直接使用】
     * 不需要重新请求
     */
    if (!cachedUser && userId) {
      loadUserDetail(userId);
    }
  }, [userId, cachedUser, loadUserDetail]);

  /**
   * 【返回值】
   *
   * 提供给组件使用：
   * - user: 用户数据（优先使用缓存，否则为 null）
   * - loading: 是否正在加载
   * - error: 错误信息
   * - loadUserDetail: 手动触发加载的函数
   *
   * 【关于 user】
   * - 如果有缓存，直接返回缓存的用户
   * - 否则返回 null（通常意味着正在加载或出错）
   */
  return {
    user: cachedUser,
    loading,
    error,
    loadUserDetail
  };
};
