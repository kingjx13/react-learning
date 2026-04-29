/**
 * UserList组件
 * 用户列表管理组件，支持搜索、筛选、添加、编辑和删除用户
 * 
 * React学习要点：
 * 1. useState: 管理组件内部状态
 * 2. useMemo: 性能优化，缓存计算结果
 * 3. 自定义Hook: 使用useUsers封装数据管理逻辑
 * 4. 条件渲染: 根据状态显示不同的UI
 * 5. 表单验证: 使用validateUserForm进行表单验证
 */

import { useState, useMemo } from 'react';
import { useUsers } from '../../../hooks/useUsers';
import { validateUserForm } from '../../../utils/validation';
import { User, SimpleUserFormData, ValidationErrors } from '../../../types';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import UserCard from './UserCard';
import EditForm from './EditForm';
import NewUserForm from './NewUserForm';

const UserList = () => {
  const { 
    users, 
    loading, 
    error, 
    handleUpdateUser, 
    handleAddUser, 
    handleDeleteUser 
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBy, setFilterBy] = useState<'all' | 'username' | 'email'>('all');
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<SimpleUserFormData>({ name: '', username: '', email: '' });
  const [editFormErrors, setEditFormErrors] = useState<ValidationErrors>({});
  const [newUserForm, setNewUserForm] = useState<SimpleUserFormData>({ name: '', username: '', email: '' });
  const [newUserFormErrors, setNewUserFormErrors] = useState<ValidationErrors>({});
  const [showNewUserForm, setShowNewUserForm] = useState<boolean>(false);

  const filteredUsers = useMemo((): User[] => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy === 'username') {
      result = result.sort((a, b) => a.username.localeCompare(b.username));
    } else if (filterBy === 'email') {
      result = result.sort((a, b) => a.email.localeCompare(b.email));
    }

    return result;
  }, [users, searchTerm, filterBy]);

  const handleEdit = (user: User): void => {
    setEditingUser(user.id);
    setEditForm({ name: user.name, username: user.username, email: user.email });
  };

  const handleSaveEdit = async (): Promise<void> => {
    const errors = validateUserForm(editForm);
    if (Object.keys(errors).length > 0) {
      setEditFormErrors(errors);
      return;
    }

    try {
      if (editingUser !== null) {
        await handleUpdateUser(editingUser, editForm);
      }
      setEditingUser(null);
      setEditFormErrors({});
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleCancelEdit = (): void => {
    setEditingUser(null);
    setEditFormErrors({});
  };

  const handleAdd = async (): Promise<void> => {
    const errors = validateUserForm(newUserForm);
    if (Object.keys(errors).length > 0) {
      setNewUserFormErrors(errors);
      return;
    }

    try {
      await handleAddUser(newUserForm);
      setNewUserForm({ name: '', username: '', email: '' });
      setNewUserFormErrors({});
      setShowNewUserForm(false);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleDelete = async (userId: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await handleDeleteUser(userId);
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">Error loading users: {error.message}</div>;
  }

  return (
    <div className="user-list">
      <h1>User Management</h1>
      
      <div className="search-filter">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterButtons filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>

      {showNewUserForm ? (
        <NewUserForm 
          newUserForm={newUserForm}
          setNewUserForm={setNewUserForm}
          errors={newUserFormErrors}
          onAdd={handleAdd}
          onCancel={() => setShowNewUserForm(false)}
        />
      ) : (
        <button className="add-user-btn" onClick={() => setShowNewUserForm(true)}>
          Add New User
        </button>
      )}

      <div className="user-cards">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
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