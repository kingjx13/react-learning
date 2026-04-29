/**
 * 【用户列表页面组件：UserList】
 *
 * 本组件是应用的主页面，展示用户列表并提供搜索、筛选、添加、编辑、删除功能
 *
 * 【Zustand 直接集成】
 * - 本组件直接使用 useUserStore 获取全局状态
 * - 无需通过自定义 Hook 中转
 * - 展示 Zustand 的简洁用法
 */

/**
 * 【React 内置 Hook 导入】
 *
 * useState - 管理组件内部状态
 * useMemo - 缓存计算结果，优化性能
 * useEffect - 处理副作用
 */
import { useState, useMemo, useEffect } from 'react';

/**
 * 【Zustand Store】
 *
 * useUserStore - 全局用户状态管理
 *
 * 【Zustand 的优势】
 * - 无需 Provider 包裹
 * - 可以直接在组件中调用
 * - 自动处理订阅和更新
 *
 * 【选择器模式】
 * useUserStore(state => state.xxx)
 * - 只订阅需要的状态片段
 * - 只有该片段变化时才重新渲染
 */
import useUserStore from '../../../hooks/useUserStore';

/**
 * 【工具函数】
 *
 * validateUserForm - 表单验证函数
 */
import { validateUserForm } from '../../../utils/validation';

/**
 * 【类型导入】
 *
 * User - 用户数据类型
 * SimpleUserFormData - 简化表单数据类型
 * ValidationErrors - 验证错误类型
 */
import { User, SimpleUserFormData, ValidationErrors } from '../../../types';

/** 子组件导入 */
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import UserCard from './UserCard';
import EditForm from './EditForm';
import NewUserForm from './NewUserForm';

/**
 * UserList 主组件
 *
 * 【Zustand 直接调用】
 *
 * 在函数组件中直接调用 useUserStore
 * 无需 props 传递、无需 Context、无需 HOC
 */
const UserList = () => {
  /**
   * 【从 Zustand Store 获取状态和方法】
   *
   * 【Zustand 选择器】
   *
   * 方式 1：解构获取多个状态（组件会在这任何一个变化时重渲染）
   * const { users, loading, error, updateUser, addUser, removeUser } = useUserStore()
   *
   * 方式 2：选择器精确订阅（推荐，只有指定状态变化才重渲染）
   * const users = useUserStore(state => state.users)
   * const loading = useUserStore(state => state.loading)
   *
   * 这里我们使用方式 1，因为需要同时使用多个状态
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
   * 类似于 componentDidMount
   * 空依赖数组表示只在首次渲染时执行
   */
  useEffect(() => {
    loadUsers();
  }, []);

  /**
   * 【搜索状态】
   *
   * searchTerm - 搜索关键词
   * setSearchTerm - 更新搜索词的函数
   */
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * 【筛选状态】
   *
   * filterBy - 当前的筛选方式
   * - 'all': 显示全部
   * - 'username': 按用户名排序
   * - 'email': 按邮箱排序
   */
  const [filterBy, setFilterBy] = useState<'all' | 'username' | 'email'>('all');

  /**
   * 【编辑状态】
   *
   * editingUser - 正在编辑的用户 ID
   * - null: 没有用户在编辑
   * - number: 正在编辑的用户 ID
   */
  const [editingUser, setEditingUser] = useState<number | null>(null);

  /**
   * 【编辑表单数据】
   */
  const [editForm, setEditForm] = useState<SimpleUserFormData>({
    name: '',
    username: '',
    email: ''
  });

  /**
   * 【编辑表单错误】
   */
  const [editFormErrors, setEditFormErrors] = useState<ValidationErrors>({});

  /**
   * 【新建用户表单数据】
   */
  const [newUserForm, setNewUserForm] = useState<SimpleUserFormData>({
    name: '',
    username: '',
    email: ''
  });

  /** 新建用户表单错误 */
  const [newUserFormErrors, setNewUserFormErrors] = useState<ValidationErrors>({});

  /**
   * 【新建表单显示状态】
   */
  const [showNewUserForm, setShowNewUserForm] = useState<boolean>(false);

  /**
   * 【useMemo - 过滤和排序用户】
   *
   * useMemo 是性能优化 Hook
   * 用于缓存"昂贵计算"的结果
   * 只有依赖变化时才重新计算
   */
  const filteredUsers = useMemo((): User[] => {
    let result = [...users];

    /**
     * 【搜索过滤】
     *
     * 实现不区分大小写的搜索
     */
    if (searchTerm) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    /**
     * 【排序】
     *
     * Array.sort() 接收比较函数
     * localeCompare 用于字符串排序
     */
    if (filterBy === 'username') {
      result = result.sort((a, b) => a.username.localeCompare(b.username));
    } else if (filterBy === 'email') {
      result = result.sort((a, b) => a.email.localeCompare(b.email));
    }

    return result;
  }, [users, searchTerm, filterBy]);

  /**
   * 【开始编辑】
   */
  const handleEdit = (user: User): void => {
    setEditingUser(user.id);
    setEditForm({
      name: user.name,
      username: user.username,
      email: user.email
    });
  };

  /**
   * 【保存编辑】
   *
   * 直接调用 Zustand Store 的 updateUser 方法
   */
  const handleSaveEdit = async (): Promise<void> => {
    const errors = validateUserForm(editForm);
    if (Object.keys(errors).length > 0) {
      setEditFormErrors(errors);
      return;
    }

    try {
      if (editingUser !== null) {
        await updateUser(editingUser, editForm);
      }
      setEditingUser(null);
      setEditFormErrors({});
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  /**
   * 【取消编辑】
   */
  const handleCancelEdit = (): void => {
    setEditingUser(null);
    setEditFormErrors({});
  };

  /**
   * 【添加用户】
   *
   * 直接调用 Zustand Store 的 addUser 方法
   */
  const handleAdd = async (): Promise<void> => {
    const errors = validateUserForm(newUserForm);
    if (Object.keys(errors).length > 0) {
      setNewUserFormErrors(errors);
      return;
    }

    try {
      await addUser(newUserForm);
      /**
       * 【重置表单】
       */
      setNewUserForm({ name: '', username: '', email: '' });
      setNewUserFormErrors({});
      setShowNewUserForm(false);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  /**
   * 【删除用户】
   *
   * 直接调用 Zustand Store 的 removeUser 方法
   */
  const handleDelete = async (userId: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await removeUser(userId);
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  /**
   * 【加载状态】
   */
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  /**
   * 【错误状态】
   */
  if (error) {
    return <div className="error">Error loading users: {error.message}</div>;
  }

  /**
   * 【主渲染】
   */
  return (
    <div className="user-list">
      <h1>User Management</h1>

      {/**
       * 【搜索和筛选区域】
       */}
      <div className="search-filter">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterButtons filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>

      {/**
       * 【新建用户表单/添加按钮切换】
       */}
      {showNewUserForm ? (
        <NewUserForm
          newUserForm={newUserForm}
          setNewUserForm={setNewUserForm}
          errors={newUserFormErrors}
          onAdd={handleAdd}
          onCancel={() => setShowNewUserForm(false)}
        />
      ) : (
        <button
          className="add-user-btn"
          onClick={() => setShowNewUserForm(true)}
        >
          Add New User
        </button>
      )}

      {/**
       * 【用户卡片列表】
       *
       * 使用 key 属性帮助 React 高效更新列表
       */}
      <div className="user-cards">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            {/**
             * 【编辑/显示切换】
             */}
            {editingUser === user.id ? (
              <EditForm
                editForm={editForm}
                setEditForm={setEditForm}
                errors={editFormErrors}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <UserCard
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;


/**
 * 【Zustand 使用总结】
 *
 * 【之前的方式：通过自定义 Hook】
 * const { users, loading, updateUser } = useUsers();
 *
 * 【现在的方式：直接使用 Zustand】
 * const users = useUserStore(state => state.users);
 * const loading = useUserStore(state => state.loading);
 * const updateUser = useUserStore(state => state.updateUser);
 *
 * 【Zustand 的优势】
 * 1. 无需自定义 Hook 封装
 * 2. 无需 Context Provider
 * 3. 按需订阅，性能更好
 * 4. 代码更直接，更易理解
 * 5. 可以从任何组件直接访问
 *
 * 【Zustand vs Props Drilling】
 *
 * 假设有 4 层组件：A -> B -> C -> D
 * 如果 D 需要用户数据：
 *
 * Props Drilling 方式：
 * A(持有users) -> B(props.users) -> C(props.users) -> D(props.users)
 *
 * Zustand 方式：
 * A(持有users) -直接访问-> D(useUserStore(state => state.users))
 *
 * 中间组件 B、C 完全不需要知道数据的存在！
 */
