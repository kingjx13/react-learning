/**
 * 【Zustand 用户状态管理 Store】
 *
 * 本文件使用 Zustand 管理全局用户状态
 *
 * 【什么是 Zustand？】
 * - Zustand 是一个轻量级的状态管理库
 * - API 简洁，只有 create 和 useStore 两个主要概念
 * - 基于 Hooks，无需 Provider 包裹
 * - 支持中间件（如持久化、DevTools）
 *
 * 【Zustand vs Redux】
 * | 特性         | Zustand        | Redux            |
 * |-------------|----------------|------------------|
 * | Boilerplate | 极少           | 较多              |
 * | 学习曲线    | 低             | 中               |
 * | Provider    | 不需要          | 需要              |
 * | Reducer     | 不需要          | 需要              |
 * | Middleware  | 可选            | 必须配置          |
 * | 包大小      | ~1KB           | ~7KB             |
 *
 * 【Zustand 核心概念】
 * 1. create() - 创建 store
 * 2. useStore() - 在组件中使用 store
 * 3. state - 状态数据
 * 4. actions - 更新状态的方法
 */

import { create } from 'zustand';
import { User } from '../types';
import { fetchUsers, updateUser, createUser, deleteUser } from '../services/api';

/**
 * UserState - 用户状态接口
 *
 * 定义 store 中存储的状态数据结构
 */
interface UserState {
  /** 用户列表数据 */
  users: User[];

  /** 加载状态 */
  loading: boolean;

  /** 错误信息 */
  error: Error | null;

  /** 选中的用户 ID（用于详情页） */
  selectedUserId: string | null;
}

/**
 * UserActions - 用户操作接口
 *
 * 定义可以更新状态的方法
 * 将"做什么"和"如何做"分离
 */
interface UserActions {
  /** 加载用户列表 */
  loadUsers: () => Promise<void>;

  /** 更新用户 */
  updateUser: (id: number, data: Partial<User>) => Promise<User>;

  /** 添加用户 */
  addUser: (data: Partial<User>) => Promise<User>;

  /** 删除用户 */
  removeUser: (id: number) => Promise<void>;

  /** 设置选中的用户 ID */
  setSelectedUserId: (id: string | null) => void;

  /** 选择单个用户 */
  selectUser: (id: string) => Promise<User>;
}

/**
 * UserStore 类型
 *
 * 合并状态和操作
 * 这是我们实际使用的 store 类型
 */
type UserStore = UserState & UserActions;

/**
 * createUserStore - 创建用户状态管理 Store
 *
 * 【Zustand 的 create 函数】
 * - 参数是一个返回 state 和 actions 的函数
 * - 返回 hook，可以使用解构获取任意 state 或 actions
 *
 * 【Zustand 的特点】
 * - 不需要 Provider 包裹
 * - 可以在任何组件中使用
 * - 支持按需订阅，只更新需要的组件
 */
const useUserStore = create<UserStore>((set, get) => ({
  /**
   * 【初始状态】
   */

  /** 用户列表 - 初始为空数组 */
  users: [],

  /** 加载状态 - 初始为 false */
  loading: false,

  /** 错误信息 - 初始为 null */
  error: null,

  /** 选中用户 ID - 初始为 null */
  selectedUserId: null,

  /**
   * 【Actions - 状态更新方法】
   *
   * 每个 action 都是一个函数
   * 第一个参数是当前的 state
   * 第二个参数是 set 函数，用于更新 state
   */

  /**
   * loadUsers - 加载用户列表
   *
   * 【Zustand 的 set 函数】
   * - 用于更新状态
   * - 可以接受部分更新
   * - 自动合并到现有状态
   */
  loadUsers: async () => {
    set({ loading: true, error: null });

    try {
      const users = await fetchUsers();
      set({ users, loading: false });
    } catch (err) {
      set({ error: err as Error, loading: false });
    }
  },

  /**
   * updateUser - 更新用户
   */
  updateUser: async (id: number, data: Partial<User>) => {
    try {
      const updatedUser = await updateUser(id, data);

      /**
       * 【函数式更新】
       *
       * set(state => newState)
       * - 接收一个函数，参数是当前状态
       * - 返回新状态
       * - 推荐用于基于当前状态计算新状态
       */
      set(state => ({
        users: state.users.map(user =>
          user.id === id ? updatedUser : user
        )
      }));

      return updatedUser;
    } catch (err) {
      set({ error: err as Error });
      throw err;
    }
  },

  /**
   * addUser - 添加用户
   */
  addUser: async (data: Partial<User>) => {
    try {
      const newUser = await createUser(data);

      set(state => ({
        users: [...state.users, newUser]
      }));

      return newUser;
    } catch (err) {
      set({ error: err as Error });
      throw err;
    }
  },

  /**
   * removeUser - 删除用户
   */
  removeUser: async (id: number) => {
    try {
      await deleteUser(id);

      set(state => ({
        users: state.users.filter(user => user.id !== id)
      }));
    } catch (err) {
      set({ error: err as Error });
      throw err;
    }
  },

  /**
   * setSelectedUserId - 设置选中的用户 ID
   */
  setSelectedUserId: (id: string | null) => {
    set({ selectedUserId: id });
  },

  /**
   * selectUser - 选择并获取用户详情
   */
  selectUser: async (id: string) => {
    const { users } = get();

    /**
     * 【优化：检查缓存】
     * 如果用户已在列表中，直接返回
     * 避免重复请求
     */
    const cachedUser = users.find(user => user.id === Number(id));
    if (cachedUser) {
      set({ selectedUserId: id });
      return cachedUser;
    }

    /**
     * 【动态导入】
     * 只有在需要时才导入
     * 避免循环依赖
     */
    const { fetchUserDetail } = await import('../services/api');

    try {
      const user = await fetchUserDetail(id);
      set({ selectedUserId: id });
      return user;
    } catch (err) {
      set({ error: err as Error });
      throw err;
    }
  }
}));

export default useUserStore;


/**
 * 【Zustand 使用方式】
 *
 * 【在组件中使用】
 *
 * // 方式 1：解构获取需要的状态和 actions
 * const { users, loading, loadUsers } = useUserStore();
 *
 * // 方式 2：按需订阅（推荐，性能更好）
 * const users = useUserStore(state => state.users);
 * const loading = useUserStore(state => state.loading);
 *
 * 【组件自动更新】
 * - 只有使用到的 state 变化时，组件才会重新渲染
 * - 不需要 useSelector（Zustand 自动处理）
 *
 * 【中间件示例】
 *
 * // 持久化中间件
 * import { persist } from 'zustand/middleware';
 *
 * const useStore = create(
 *   persist(
 *     (set) => ({ ... }),
 *     { name: 'user-storage' }
 *   )
 * );
 *
 * // DevTools 中间件
 * import { devtools } from 'zustand/middleware';
 *
 * const useStore = create(
 *   devtools(
 *     (set) => ({ ... }),
 *     { name: 'UserStore' }
 *   )
 * );
 */


/**
 * 【Zustand 设计模式】
 *
 * 1. 【分离状态和操作】
 *    - state: 数据
 *    - actions: 方法
 *    - 便于管理和测试
 *
 * 2. 【不可变性】
 *    - 不直接修改 state
 *    - 使用展开运算符创建新对象
 *
 * 3. 【按需订阅】
 *    - 组件只订阅需要的状态
 *    - 避免不必要的重新渲染
 *
 * 4. 【中间件扩展】
 *    - persist: 持久化到 localStorage
 *    - devtools: Redux DevTools 集成
 *    - immer: 不可变更新更简洁
 */
