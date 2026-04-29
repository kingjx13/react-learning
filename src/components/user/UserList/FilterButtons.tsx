/**
 * FilterButtons组件
 * 用户筛选功能组件
 * 
 * React学习要点：
 * 1. 条件渲染: 根据filterBy状态添加active类名
 * 2. 事件处理: 通过onClick触发状态更新
 * 3. 组件化设计: 独立管理筛选相关的UI逻辑
 */

interface FilterButtonsProps {
  filterBy: 'all' | 'username' | 'email';
  setFilterBy: (value: 'all' | 'username' | 'email') => void;
}

const FilterButtons = ({ filterBy, setFilterBy }: FilterButtonsProps) => {
  return (
    <div className="filter-buttons">
      <button 
        className={filterBy === 'all' ? 'active' : ''}
        onClick={() => setFilterBy('all')}
      >
        All
      </button>
      <button 
        className={filterBy === 'username' ? 'active' : ''}
        onClick={() => setFilterBy('username')}
      >
        By Username
      </button>
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