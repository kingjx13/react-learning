/**
 * 【编辑表单组件：EditForm】
 *
 * 本组件用于编辑现有用户信息
 * 包含三个输入字段：姓名、用户名、邮箱
 * 支持表单验证和错误显示
 *
 * 【组件特点】
 * - 受控组件：表单值由 props 控制
 * - 纯展示：不处理提交逻辑，只负责 UI
 * - 表单状态由父组件（UserList）管理
 */

/** 类型导入 */
import { SimpleUserFormData, ValidationErrors } from '../../../types';

/**
 * EditFormProps 接口
 *
 * 定义编辑表单组件的 props
 */
interface EditFormProps {
  /** 当前表单数据 */
  editForm: SimpleUserFormData;

  /**
   * 更新表单数据的回调函数
   *
   * 【展开运算符 ...editForm】
   * - 复制现有表单数据
   * - 然后覆盖特定字段
   * - 保持其他字段不变
   */
  setEditForm: (form: SimpleUserFormData) => void;

  /** 表单验证错误 */
  errors: ValidationErrors;

  /** 保存按钮点击回调 */
  onSave: () => void;

  /** 取消按钮点击回调 */
  onCancel: () => void;
}

/**
 * EditForm 组件
 *
 * @param editForm - 当前表单数据
 * @param setEditForm - 更新表单的函数
 * @param errors - 验证错误
 * @param onSave - 保存回调
 * @param onCancel - 取消回调
 */
const EditForm = ({ editForm, setEditForm, errors, onSave, onCancel }: EditFormProps) => {
  return (
    <div className="edit-form">
      {/**
       * 【姓名输入框】
       *
       * value={editForm.name}
       * - 受控组件：值由 props 控制
       *
       * onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
       * - 输入变化时更新 state
       * - ...editForm 保留其他字段
       * - name: e.target.value 只更新 name
       */}
      <div className="form-field">
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          placeholder="Name"
        />
        {/**
         * 【错误显示】
         *
         * errors.name && <div>...</div>
         * - 如果 errors.name 存在（truthy），渲染错误信息
         * - 如果不存在（falsy），不渲染
         *
         * 【逻辑与 && 运算符】
         * - condition && expression
         * - 条件为真返回 expression
         * - 条件为假返回 false（不渲染）
         */}
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      {/**
       * 【用户名输入框】
       */}
      <div className="form-field">
        <input
          type="text"
          value={editForm.username}
          onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
          placeholder="Username"
        />
        {errors.username && <div className="error-message">{errors.username}</div>}
      </div>

      {/**
       * 【邮箱输入框】
       */}
      <div className="form-field">
        <input
          type="email"
          value={editForm.email}
          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
          placeholder="Email"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      {/**
       * 【按钮组】
       */}
      <div className="form-buttons">
        {/**
         * 【保存按钮】
         */}
        <button onClick={onSave}>Save</button>

        {/**
         * 【取消按钮】
         */}
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;


/**
 * 【受控表单组件】
 *
 * 【什么是受控组件？】
 * - 表单元素的值由 React state 控制
 * - 输入 = state.current
 * - 输出 = setState(newValue)
 *
 * 【受控组件模式】
 * <input
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 *
 * 【为什么使用受控组件？】
 * 1. 可以实时验证输入
 * 2. 可以动态修改输入值
 * 3. 可以禁用输入框
 * 4. 更容易实现复杂的表单逻辑
 *
 *
 * 【展开运算符 ...】
 *
 * 【对象展开】
 * { ...editForm, name: e.target.value }
 * - 复制 editForm 的所有属性
 * - 覆盖 name 属性
 * - 返回新对象
 *
 * 【注意】
 * - 不修改原对象
 * - 符合 React 不可变原则
 *
 *
 * 【表单验证流程】
 *
 * 1. 用户输入 → onChange → 更新 state
 * 2. 点击保存 → 调用 onSave 回调
 * 3. 父组件验证表单
 * 4. 如果有错误，更新 errors state
 * 5. 子组件显示错误信息
 * 6. 如果无错误，执行保存操作
 *
 *
 * 【ErrorMessage 显示时机】
 *
 * {errors.name && <div className="error-message">{errors.name}</div>}
 *
 * - errors = { name: 'Name is required' }
 *   → errors.name = 'Name is required' (truthy)
 *   → 显示错误信息
 *
 * - errors = {}
 *   → errors.name = undefined (falsy)
 *   → 不渲染任何内容
 */
