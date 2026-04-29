/**
 * 【搜索栏组件：SearchBar】
 *
 * 本组件提供用户搜索功能
 * 包含一个输入框，用户可以输入搜索关键词
 *
 * 【受控组件概念】
 * - 输入框的值由 React state 控制
 * - 每次输入都会更新 state
 * - state 变化触发组件重新渲染
 *
 * 【单向数据流】
 * - 数据从父组件通过 props 传入
 * - 子组件不能直接修改 props
 * - 需要通过回调函数通知父组件
 */

/**
 * SearchBarProps 接口
 *
 * 定义组件接受的 props 类型
 *
 * 【TypeScript 接口】
 * - 定义对象的结构
 * - 提供类型安全
 * - IDE 自动补全支持
 */
interface SearchBarProps {
  /** 当前搜索关键词 */
  searchTerm: string;

  /**
   * 更新搜索关键词的回调函数
   *
   * 【回调函数类型】
   * (value: string) => void
   * - 接收一个字符串参数
   * - 没有返回值
   */
  setSearchTerm: (value: string) => void;
}

/**
 * SearchBar 组件
 *
 * @param searchTerm - 当前搜索词
 * @param setSearchTerm - 更新搜索词的函数
 *
 * 【函数组件参数解构】
 * const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => { }
 * - 直接从 props 对象中提取需要的属性
 * - 不需要再写 props.searchTerm
 */
const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  /**
   * return JSX
   */
  return (
    <input
      /**
       * 【input 元素属性】
       *
       * type="text"
       * - 文本输入框
       *
       * placeholder="..."
       * - 占位提示文字
       * - 输入为空时显示
       *
       * value={searchTerm}
       * - 【受控组件】输入框的值由 value 属性控制
       * - 必须配合 onChange 事件
       *
       * onChange={(e) => setSearchTerm(e.target.value)}
       * - 【事件处理】
       * - e: ChangeEvent 对象
       * - e.target: 触发事件的元素（input）
       * - e.target.value: 输入框的新值
       */
      type="text"
      placeholder="Search by name or username"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  );
};

export default SearchBar;


/**
 * 【受控组件 vs 非受控组件】
 *
 * 【受控组件】
 * - input 的值由 React state 控制
 * - 每次输入都通过 onChange 更新 state
 * - state 变化触发重新渲染
 * - 可以轻松访问和修改值
 *
 * const [value, setValue] = useState('');
 * <input value={value} onChange={e => setValue(e.target.value)} />
 *
 * 【非受控组件】
 * - 使用 ref 获取 DOM 元素的值
 * - 不需要 state 管理
 * - 适合简单的表单场景
 *
 * const inputRef = useRef<HTMLInputElement>(null);
 * <input ref={inputRef} />
 * const value = inputRef.current?.value;
 *
 *
 * 【受控组件优势】
 * 1. 可以实时验证输入
 * 2. 可以动态禁用输入框
 * 3. 可以立即响应输入变化
 * 4. 更容易实现复杂的输入逻辑
 *
 *
 * 【React 事件处理】
 *
 * 【事件类型】
 * - onChange: 输入框值变化
 * - onClick: 鼠标点击
 * - onSubmit: 表单提交
 * - onKeyDown: 键盘按键
 *
 * 【事件对象】
 * - 事件处理函数接收事件对象
 * - e.target: 事件源元素
 * - e.target.value: 元素的值
 * - e.preventDefault(): 阻止默认行为
 */
