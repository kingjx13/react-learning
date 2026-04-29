/**
 * EditForm组件
 * 用户编辑表单组件
 * 
 * React学习要点：
 * 1. 受控表单: 表单值由state控制
 * 2. 表单验证: 显示验证错误信息
 * 3. 组件化设计: 独立管理编辑表单的UI逻辑
 */

import { SimpleUserFormData, ValidationErrors } from '../../../types';

interface EditFormProps {
  editForm: SimpleUserFormData;
  setEditForm: (form: SimpleUserFormData) => void;
  errors: ValidationErrors;
  onSave: () => void;
  onCancel: () => void;
}

const EditForm = ({ editForm, setEditForm, errors, onSave, onCancel }: EditFormProps) => {
  return (
    <div className="edit-form">
      <div className="form-field">
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          placeholder="Name"
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      <div className="form-field">
        <input
          type="text"
          value={editForm.username}
          onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
          placeholder="Username"
        />
        {errors.username && <div className="error-message">{errors.username}</div>}
      </div>
      <div className="form-field">
        <input
          type="email"
          value={editForm.email}
          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
          placeholder="Email"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div className="form-buttons">
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;