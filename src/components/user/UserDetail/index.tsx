/**
 * UserDetail组件
 * 显示单个用户的详细信息
 * 
 * React学习要点：
 * 1. useParams: React Router提供的Hook，用于获取URL参数
 * 2. 自定义Hook: 使用useUserDetail封装数据获取逻辑
 * 3. 条件渲染: 根据loading、error、user状态显示不同内容
 */

import { useParams, Link } from 'react-router-dom';
import { useUserDetail } from '../../../hooks/useUserDetail';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { user, loading, error } = useUserDetail(id);

  if (loading) {
    return <div className="loading">Loading user details...</div>;
  }

  if (error) {
    return <div className="error">Error loading user details: {error.message}</div>;
  }

  if (!user) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="user-detail">
      <Link to="/" className="back-btn">Back to List</Link>
      <h1>User Details</h1>
      <div className="detail-card">
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        
        <div className="address">
          <h3>Address</h3>
          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>Suite:</strong> {user.address.suite}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
          <p><strong>Geo:</strong> Lat {user.address.geo.lat}, Lng {user.address.geo.lng}</p>
        </div>
        
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