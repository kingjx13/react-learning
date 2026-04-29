/**
 * 【新建用户表单组件：NewUserForm】
 *
 * 本组件用于添加新用户
 * 包含三个输入字段：姓名、用户名、邮箱
 * 支持表单验证和错误显示
 *
 * 【与 EditForm 的区别】
 * - NewUserForm 用于创建新用户
 * - EditForm 用于编辑现有用户
 * - 功能相同，标题和按钮文字不同
 *
 * 【组件特点】
 * - 受控组件
 * - 纯展示组件
 * - 状态由父组件管理
 */

/** 类型导入 */
import { SimpleUserFormData, ValidationErrors } from '../../../types';

/**
 * NewUserFormProps 接口
 *
 * 定义新建表单组件的 props
 * 与 EditFormProps 结构相同
 */
interface NewUserFormProps {
  /** 当前表单数据 */
  newUserForm: SimpleUserFormData;

  /** 更新表单数据的回调函数 */
  setNewUserForm: (form: SimpleUserFormData) => void;

  /** 表单验证错误 */
  errors: ValidationErrors;

  /** 添加按钮点击回调 */
  onAdd: () => void;

  /** 取消按钮点击回调 */
  onCancel: () => void;
}

/**
 * NewUserForm 组件
 *
 * @param newUserForm - 当前表单数据
 * @param setNewUserForm - 更新表单的函数
 * @param errors - 验证错误
 * @param onAdd - 添加回调
 * @param onCancel - 取消回调
 */
const NewUserForm = ({ newUserForm, setNewUserForm, errors, onAdd, onCancel }: NewUserFormProps) => {
  return (
    <div className="new-user-form">
      {/**
       * 【表单标题】
       */}
      <h2>Add New User</h2>

      {/**
       * 【姓名输入框】
       *
       * placeholder="Name"
       * - 占位符，输入为空时显示
       */}
      <div className="form-field">
        <input
          type="text"
          placeholder="Name"
          value={newUserForm.name}
          onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      {/**
       * 【用户名输入框】
       */}
      <div className="form-field">
        <input
          type="text"
          placeholder="Username"
          value={newUserForm.username}
          onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
        />
        {errors.username && <div className="error-message">{errors.username}</div>}
      </div>

      {/**
       * 【邮箱输入框】
       */}
      <div className="form-field">
        <input
          type="email"
          placeholder="Email"
          value={newUserForm.email}
          onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      {/**
       * 【按钮组】
       */}
      <div className="form-buttons">
        {/**
         * 【添加按钮】
         */}
        <button onClick={onAdd}>Add User</button>

        {/**
         * 【取消按钮】
         */}
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default NewUserForm;


/**
 * 【EditForm vs NewUserForm】
 *
 * 这两个组件结构几乎相同，但有以下区别：
 *
 * | 特性 | EditForm | NewUserForm |
 * |------|----------|-------------|
 * | 用途 | 编辑现有用户 | 创建新用户 |
 * | 标题 | 无 | "Add New User" |
 * | 主要按钮 | "Save" | "Add User" |
 *
 * 【为什么分开组件？】
 * - 语义化更好
 * - 方便未来独立扩展
 * - 如果需求分化，可以分别修改
 *
 * 【是否可以合并？】
 * - 可以，通过 props 控制标题和按钮文字
 * - 例如：title="Edit User", submitText="Save"
 * - 但当前分离更清晰
 *
 *
 * 【表单重置逻辑】
 *
 * 新建表单在成功提交后需要重置：
 *
 * // UserList.tsx
 * const handleAdd = async () => {
 *   await handleAddUser(newUserForm);
 *   setNewUserForm({ name: '', username: '', email: '' }); // 重置
 *   setNewUserFormErrors({});
 *   setShowNewUserForm(false); // 隐藏表单
 * };
 *
 * 编辑表单在保存后也需要重置：
 *
 * const handleSaveEdit = async () => {
 *   await handleUpdateUser(editingUser, editForm);
 *   setEditingUser(null); // 退出编辑模式
 *   setEditFormErrors({});
 * };
 *
 *
 * 【placeholder vs value】
 *
 * placeholder="Name"
 * - 占位符
 * - 输入为空时显示
 * - 用户输入后消失
 *
 * value={newUserForm.name}
 * - 受控组件的值
 * - 决定输入框显示什么
 *
 * 当 value 有值时，placeholder 不显示
 * 当 value 为空时，placeholder 显示
 */
