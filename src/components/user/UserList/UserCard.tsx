/**
 * UserCard组件
 * 显示单个用户的信息和操作按钮
 * 
 * React学习要点：
 * 1. 组件通信: 通过props接收用户数据和回调函数
 * 2. React Router: 使用Link组件进行导航
 * 3. 事件处理: 通过onClick触发编辑和删除操作
 * 4. 组件化设计: 独立管理单个用户卡片的UI逻辑
 */

import { Link } from 'react-router-dom';
import { User } from '../../../types';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <div className="card-buttons">
        <Link to={`/user/${user.id}`} className="view-btn">View Details</Link>
        <button onClick={() => onEdit(user)} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(user.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default UserCard;