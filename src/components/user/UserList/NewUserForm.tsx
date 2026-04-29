/**
 * NewUserForm组件
 * 添加新用户表单组件
 * 
 * React学习要点：
 * 1. 受控表单: 表单值由state控制
 * 2. 表单验证: 显示验证错误信息
 * 3. 组件化设计: 独立管理新用户表单的UI逻辑
 */

import { SimpleUserFormData, ValidationErrors } from '../../../types';

interface NewUserFormProps {
  newUserForm: SimpleUserFormData;
  setNewUserForm: (form: SimpleUserFormData) => void;
  errors: ValidationErrors;
  onAdd: () => void;
  onCancel: () => void;
}

const NewUserForm = ({ newUserForm, setNewUserForm, errors, onAdd, onCancel }: NewUserFormProps) => {
  return (
    <div className="new-user-form">
      <h2>Add New User</h2>
      <div className="form-field">
        <input
          type="text"
          placeholder="Name"
          value={newUserForm.name}
          onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      <div className="form-field">
        <input
          type="text"
          placeholder="Username"
          value={newUserForm.username}
          onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
        />
        {errors.username && <div className="error-message">{errors.username}</div>}
      </div>
      <div className="form-field">
        <input
          type="email"
          placeholder="Email"
          value={newUserForm.email}
          onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div className="form-buttons">
        <button onClick={onAdd}>Add User</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default NewUserForm;