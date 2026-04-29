/**
 * 【用户详情页面组件：UserDetail】
 *
 * 本组件展示单个用户的完整信息
 * 通过 URL 参数获取用户 ID，然后请求并显示用户数据
 *
 * 【Zustand 直接集成】
 * - 本组件直接使用 useUserStore 获取全局状态
 * - 利用缓存机制，如果用户已在列表中则无需重新请求
 */

/**
 * 【React Router Hook 导入】
 *
 * useParams - 获取 URL 中的动态参数
 * Link - 声明式导航组件
 */
import { useParams, Link } from 'react-router-dom';

/**
 * 【React Hook 导入】
 *
 * useEffect - 处理副作用
 */
import { useEffect } from 'react';

/**
 * 【Zustand Store】
 *
 * useUserStore - 全局用户状态管理
 *
 * 【Zustand 缓存优势】
 * - 如果用户已在全局状态中（从列表页跳转）
 * - 可以直接使用缓存，无需重复请求
 * - 提高性能，减少 API 调用
 */
import useUserStore from '../../../hooks/useUserStore';

/**
 * UserDetail 组件
 *
 * 【Zustand 数据流】
 * 1. 从 URL 获取用户 ID
 * 2. 检查 Zustand Store 是否有缓存的用户
 * 3. 如果有缓存，直接使用
 * 4. 如果没有，调用 API 获取
 */
const UserDetail = () => {
  /**
   * 【useParams 获取路由参数】
   *
   * URL: /user/:id
   * 实际 URL: /user/1
   */
  const { id } = useParams<{ id: string }>();

  /**
   * 【从 Zustand Store 获取状态和方法】
   *
   * 【按需订阅】
   * - users: 从缓存中查找用户
   * - loading: 显示加载状态
   * - error: 显示错误信息
   * - selectUser: 获取用户详情的方法
   */
  const users = useUserStore(state => state.users);
  const loading = useUserStore(state => state.loading);
  const error = useUserStore(state => state.error);
  const selectUser = useUserStore(state => state.selectUser);

  /**
   * 【从缓存中查找用户】
   *
   * 【Zustand 缓存机制】
   * - 如果用户已在列表中（从列表页点击进入）
   * - 可以直接使用，无需重新请求
   * - 这是 Zustand 全局状态共享的优势
   */
  const user = users.find(u => u.id === Number(id)) || null;

  /**
   * 【useEffect - 组件挂载时获取用户】
   *
   * 依赖：
   * - id: 用户 ID 变化时重新获取
   * - user: 用户加载完成后停止加载
   */
  useEffect(() => {
    if (!user && id) {
      selectUser(id);
    }
  }, [id, user, selectUser]);

  /**
   * 【加载状态渲染】
   */
  if (loading) {
    return <div className="loading">Loading user details...</div>;
  }

  /**
   * 【错误状态渲染】
   */
  if (error) {
    return <div className="error">Error loading user details: {error.message}</div>;
  }

  /**
   * 【用户不存在渲染】
   */
  if (!user) {
    return <div className="error">User not found</div>;
  }

  /**
   * 【用户详情渲染】
   */
  return (
    <div className="user-detail">
      {/**
       * 【Link 导航链接】
       *
       * Link 是 React Router 提供的组件
       * - to="/": 点击跳转到根路径
       * - 不会触发页面刷新（单页应用）
       */}
      <Link to="/" className="back-btn">Back to List</Link>

      <h1>User Details</h1>

      {/**
       * 【用户信息卡片】
       */}
      <div className="detail-card">
        <h2>{user.name}</h2>

        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>

        {/**
         * 【地址信息区块】
         */}
        <div className="address">
          <h3>Address</h3>
          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>Suite:</strong> {user.address.suite}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Zipcode:</strong> {user.address.zipcode}</p>

          {/**
           * 【地理坐标】
           */}
          <p><strong>Geo:</strong> Lat {user.address.geo.lat}, Lng {user.address.geo.lng}</p>
        </div>

        {/**
         * 【公司信息区块】
         */}
        <div className="company">
          <h3>Company</h3>
          <p><strong>Name:</strong> {user.company.name}</p>
          <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
          <p><strong>BS:</strong> {user.company.bs}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;


/**
 * 【Zustand 数据共享示例】
 *
 * 【场景：用户从列表页进入详情页】
 *
 * 1. 用户在 UserList 页面
 *    - UserList 调用 loadUsers()
 *    - 所有用户数据存储在 Zustand Store
 *
 * 2. 用户点击某个用户
 *    - 跳转到 /user/:id
 *    - 进入 UserDetail 组件
 *
 * 3. UserDetail 检查缓存
 *    - const user = users.find(u => u.id === Number(id))
 *    - 如果找到，直接使用缓存
 *    - 如果没找到，调用 selectUser(id) 请求
 *
 * 【优势】
 * - 无需重复请求 API
 * - 数据在组件间共享
 * - 状态管理集中化
 *
 *
 * 【Zustand vs Redux 在数据共享上的对比】
 *
 * Redux:
 * - 需要配置 Provider
 * - 需要定义 reducer、action、dispatch
 * - 数据获取需要 selector + useSelector
 *
 * Zustand:
 * - 无需 Provider
 * - 直接 create + useStore
 * - 数据获取只需 state => state.xxx
 * - 代码量减少 70%+
 */
