/**
 * SearchBar组件
 * 用户搜索功能组件
 * 
 * React学习要点：
 * 1. 受控组件: input的值由state控制
 * 2. 单向数据流: 通过props传递值和回调函数
 * 3. 组件化设计: 独立管理搜索相关的UI逻辑
 */

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search by name or username"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  );
};

export default SearchBar;