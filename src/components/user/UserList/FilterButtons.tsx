/**
 * 【筛选按钮组件：FilterButtons】
 *
 * 本组件提供用户列表的排序/筛选功能
 * 用户可以通过点击按钮来选择不同的排序方式
 *
 * 【组件职责】
 * - 仅负责 UI 展示
 * - 不处理业务逻辑
 * - 通过回调函数通知父组件用户的选择
 */

/**
 * FilterButtonsProps 接口
 *
 * 定义组件接受的 props 类型
 *
 * 【联合类型】
 * 'all' | 'username' | 'email'
 * - 表示 filterBy 只能是这三个字符串之一
 * - 提供类型安全，防止传入无效值
 */
interface FilterButtonsProps {
  /**
   * 当前的筛选/排序方式
   *
   * - 'all': 不排序，显示所有用户
   * - 'username': 按用户名排序
   * - 'email': 按邮箱排序
   */
  filterBy: 'all' | 'username' | 'email';

  /**
   * 更新筛选方式的回调函数
   *
   * 接收新的筛选方式作为参数
   */
  setFilterBy: (value: 'all' | 'username' | 'email') => void;
}

/**
 * FilterButtons 组件
 *
 * @param filterBy - 当前筛选方式
 * @param setFilterBy - 更新筛选方式的函数
 */
const FilterButtons = ({ filterBy, setFilterBy }: FilterButtonsProps) => {
  return (
    /**
     * 【按钮组容器】
     *
     * <div className="filter-buttons">
     * - 将多个按钮组织在一起
     * - 便于统一样式
     */
    <div className="filter-buttons">
      {/**
       * 【按钮 1：显示全部】
       *
       * 【条件渲染类名】
       * className={filterBy === 'all' ? 'active' : ''}
       * - 如果当前选中 'all'，添加 'active' 类
       * - 否则添加空字符串（无类名）
       *
       * 【三元运算符】
       * condition ? value1 : value2
       * - 条件为真返回 value1
       * - 条件为假返回 value2
       *
       * 【onClick 事件】
       * - 点击按钮时调用 setFilterBy('all')
       * - 传入新的筛选值
       */}
      <button
        className={filterBy === 'all' ? 'active' : ''}
        onClick={() => setFilterBy('all')}
      >
        All
      </button>

      {/**
       * 【按钮 2：按用户名排序】
       */}
      <button
        className={filterBy === 'username' ? 'active' : ''}
        onClick={() => setFilterBy('username')}
      >
        By Username
      </button>

      {/**
       * 【按钮 3：按邮箱排序】
       */}
      <button
        className={filterBy === 'email' ? 'active' : ''}
        onClick={() => setFilterBy('email')}
      >
        By Email
      </button>
    </div>
  );
};

export default FilterButtons;


/**
 * 【React 条件渲染】
 *
 * 【方式一：三元运算符】
 * className={condition ? 'active' : ''}
 *
 * 【方式二：逻辑与 &&】
 * className={condition && 'active'}
 * - 条件为真返回 'active'
 * - 条件为假返回 false（不渲染）
 *
 * 【方式三：if 语句】
 * if (condition) { className = 'active' }
 *
 *
 * 【按钮组设计模式】
 *
 * 1. 【状态提升】
 *    - 筛选状态存储在父组件（UserList）
 *    - 子组件通过 props 获取和更新状态
 *
 * 2. 【回调模式】
 *    - 父组件传递更新函数
 *    - 子组件调用函数通知变化
 *
 * 3. 【受控组件】
 *    - 按钮的激活状态由 filterBy prop 决定
 *    - 不是按钮自己管理状态
 *
 *
 * 【为什么使用箭头函数？】
 *
 * onClick={() => setFilterBy('all')}
 *
 * - () => setFilterBy('all') 是箭头函数
 * - onClick 需要函数引用
 * - 直接写 onClick={setFilterBy} 会立即调用
 * - 使用箭头函数延迟执行
 */
