/**
 * 【用户卡片组件：UserCard】
 *
 * 本组件展示单个用户的基本信息
 * 提供查看详情、编辑和删除操作按钮
 *
 * 【组件职责】
 * - 纯展示组件，不处理业务逻辑
 * - 接收用户数据和操作回调
 * - 负责 UI 渲染和用户交互
 *
 * 【React Router 集成】
 * - 使用 Link 组件实现导航到详情页
 */

/** React Router Link 组件 */
import { Link } from 'react-router-dom';

/** 用户类型 */
import { User } from '../../../types';

/**
 * UserCardProps 接口
 *
 * 定义组件接受的 props 类型
 */
interface UserCardProps {
  /** 要展示的用户对象 */
  user: User;

  /** 编辑按钮点击回调 */
  onEdit: (user: User) => void;

  /** 删除按钮点击回调 */
  onDelete: (userId: number) => void;
}

/**
 * UserCard 组件
 *
 * @param user - 用户数据
 * @param onEdit - 编辑回调
 * @param onDelete - 删除回调
 */
const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <div className="user-card">
      {/**
       * 【用户名称】
       */}
      <h3>{user.name}</h3>

      {/**
       * 【用户基本信息】
       */}
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      {/**
       * 【操作按钮组】
       *
       * div.card-buttons
       * - 包含多个操作按钮
       * - 统一布局和样式
       */}
      <div className="card-buttons">
        {/**
         * 【Link 组件 - 查看详情】
         *
         * to={`/user/${user.id}`}
         * - 模板字符串
         * - 生成动态路径，如 /user/1
         *
         * 【声明式导航】
         * - <Link> 类似于 <a> 标签
         * - 但不会触发页面刷新
         * - 使用 History API 实现导航
         */}
        <Link to={`/user/${user.id}`} className="view-btn">View Details</Link>

        {/**
         * 【编辑按钮】
         *
         * onClick={() => onEdit(user)}
         * - 点击时调用父组件传入的 onEdit
         * - 传入当前用户对象
         */}
        <button onClick={() => onEdit(user)} className="edit-btn">Edit</button>

        {/**
         * 【删除按钮】
         *
         * onClick={() => onDelete(user.id)}
         * - 点击时调用父组件传入的 onDelete
         * - 传入用户 ID
         */}
        <button onClick={() => onDelete(user.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default UserCard;


/**
 * 【React 中的导航方式】
 *
 * 1. 【声明式导航 - Link 组件】
 *    <Link to="/path">Text</Link>
 *    - 类似于 <a href="...">
 *    - 不刷新页面
 *    - 推荐用于普通导航
 *
 * 2. 【编程式导航 - useNavigate Hook】
 *    const navigate = useNavigate();
 *    navigate('/path');
 *    - 在事件处理中导航
 *    - 适合条件导航
 *
 * 3. 【history.push（已废弃）】
 *    - React Router 5 的方式
 *    - React Router 6 中不推荐
 *
 *
 * 【组件设计原则】
 *
 * 1. 【单一职责】
 *    - UserCard 只负责显示单个用户
 *    - 不关心列表、搜索、筛选等逻辑
 *
 * 2. 【Props 驱动】
 *    - 组件行为完全由 props 控制
 *    - 不自己管理状态（无状态组件）
 *
 * 3. 【回调模式】
 *    - 父组件传递回调函数
 *    - 子组件调用回调通知父组件
 *
 * 4. 【解耦】
 *    - UserCard 不直接调用 API
 *    - 不直接操作 state
 *    - 便于复用和测试
 *
 *
 * 【用户卡片数据结构】
 *
 * user = {
 *   id: number,
 *   name: string,
 *   username: string,
 *   email: string,
 *   phone: string,
 *   website: string,
 *   address: { street, suite, city, zipcode, geo: { lat, lng } },
 *   company: { name, catchPhrase, bs }
 * }
 *
 * 本组件只展示 id, name, username, email
 * 其他信息在 UserDetail 页面展示
 */
