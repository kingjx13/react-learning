/**
 * React核心Hooks导入说明：
 * - useState: 用于在函数组件中添加状态
 * - useEffect: 用于处理副作用操作（如数据获取、订阅、手动修改DOM等）
 *
 * React学习要点：
 * 1. Hooks是React 16.8引入的新特性，允许在函数组件中使用state和其他React特性
 * 2. Hooks必须在组件顶层调用，不能在循环、条件语句或嵌套函数中调用
 * 3. 自定义Hook是以"use"开头的函数，用于复用有状态的逻辑
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/**
 * UserList组件 - 用户列表页面
 *
 * React学习要点：
 * 1. 组件命名规范：首字母大写（UserList而不是userList）
 * 2. 组件是纯函数，给定相同的props，总是返回相同的JSX
 * 3. 组件可以有自己的内部状态（state）
 */

const UserList = () => {
  /**
   * useState Hook 使用说明：
   *
   * 语法：const [state, setState] = useState(initialValue)
   *
   * - state: 当前状态值
   * - setState: 更新状态的函数，调用后会触发组件重新渲染
   * - initialValue: 状态的初始值
   *
   * React学习要点：
   * 1. 状态是组件私有的，每个组件实例都有独立的状态
   * 2. 不能直接修改状态（如 users = [...]），必须使用setUsers
   * 3. 状态更新可能是异步的，React会批量处理状态更新
   * 4. 状态更新遵循不可变性原则，应该创建新的对象/数组而不是修改原对象
   */

  // 用户列表数据，从API获取
  const [users, setUsers] = useState([])
  // 过滤后的用户列表，用于展示
  const [filteredUsers, setFilteredUsers] = useState([])
  // 搜索关键词
  const [searchTerm, setSearchTerm] = useState('')
  // 筛选条件：all-全部, username-按用户名排序, email-按邮箱排序
  const [filterBy, setFilterBy] = useState('all')
  // 当前正在编辑的用户ID，null表示没有用户处于编辑状态
  const [editingUser, setEditingUser] = useState(null)
  // 编辑表单的数据
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '' })
  // 新增用户表单的数据
  const [newUserForm, setNewUserForm] = useState({ name: '', username: '', email: '' })
  // 控制新增用户表单的显示状态
  const [showNewUserForm, setShowNewUserForm] = useState(false)

  /**
   * useEffect Hook 使用说明：
   *
   * 语法：useEffect(effectFunction, dependencyArray)
   *
   * - effectFunction: 包含副作用操作的函数
   * - dependencyArray: 依赖数组，当其中的值变化时会重新执行effect
   *
   * React学习要点：
   * 1. useEffect用于处理副作用，如数据获取、订阅、手动修改DOM等
   * 2. 依赖数组控制effect的执行时机：
   *    - 不提供数组：每次渲染后都执行
   *    - 空数组 []：只在首次渲染后执行（相当于componentDidMount）
   *    - 有依赖 [value]：当value变化时执行
   * 3. 如果effect返回一个函数，该函数会在下一次effect执行前和组件卸载时调用
   *    （相当于componentWillUnmount）
   */

  // 组件挂载时获取用户列表
  // React学习要点：空数组表示只在首次渲染后执行一次
  useEffect(() => {
    fetchUsers()
  }, [])

  // 当用户数据、搜索词或筛选条件变化时，重新过滤用户列表
  // React学习要点：依赖数组中的每个值都会触发effect重新执行
  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, filterBy])

  /**
   * 异步数据获取函数
   *
   * React学习要点：
   * 1. API调用通常在useEffect中进行
   * 2. 使用async/await处理异步操作，使代码更易读
   * 3. 应该处理错误情况，避免未捕获的异常
   */

  // 从API获取用户列表数据
  const fetchUsers = async () => {
    try {
      // fetch API用于发起网络请求
      // React学习要点：在React中，数据获取是副作用操作，应在useEffect中进行
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      // response.json()将响应体解析为JSON
      const data = await response.json()
      // setUsers更新状态，触发组件重新渲染
      // React学习要点：状态更新是异步的，不会立即反映在DOM上
      setUsers(data)
    } catch (error) {
      // 错误处理：使用console.error记录错误信息
      console.error('Error fetching users:', error)
    }
  }

  /**
   * 过滤和排序用户列表
   *
   * React学习要点：
   * 1. filter()方法创建满足条件的新数组，不修改原数组
   * 2. sort()方法会修改原数组，使用localeCompare进行字符串排序
   * 3. 数组方法是函数式编程的体现，避免使用for循环直接修改数组
   */

  // 根据搜索词和筛选条件过滤用户列表
  const filterUsers = () => {
    let result = users

    // 根据搜索词进行过滤
    // React学习要点：条件渲染可以根据状态动态显示不同内容
    if (searchTerm) {
      // filter: 返回满足回调函数条件的元素组成的新数组
      // toLowerCase: 实现不区分大小写的搜索
      // includes: 检查字符串是否包含指定子字符串
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 根据筛选条件进行排序
    // React学习要点：sort方法会直接修改原数组，需要注意
    if (filterBy === 'username') {
      // localeCompare: 用于字符串比较，返回负数、0或正数
      result = result.sort((a, b) => a.username.localeCompare(b.username))
    } else if (filterBy === 'email') {
      result = result.sort((a, b) => a.email.localeCompare(b.email))
    }

    setFilteredUsers(result)
  }

  /**
   * 事件处理函数
   *
   * React学习要点：
   * 1. React中的事件使用camelCase命名（如onClick而不是onclick）
   * 2. 事件处理函数接收合成事件（SyntheticEvent）对象
   * 3. 不能通过返回false阻止默认行为，必须调用e.preventDefault()
   */

  // 开始编辑用户
  // React学习要点：事件处理函数中的this指向需要特别注意
  const handleEdit = (user) => {
    setEditingUser(user.id)
    // 设置编辑表单的初始值
    setEditForm({ name: user.name, username: user.username, email: user.email })
  }

  // 保存编辑后的用户信息
  // React学习要点：异步操作如API调用需要使用async/await
  const handleSaveEdit = async () => {
    try {
      /**
       * Fetch API PUT请求示例
       *
       * React学习要点：
       * 1. RESTful API使用HTTP动词表示操作类型
       * 2. PUT用于更新现有资源
       * 3. 请求体需要使用JSON格式，Content-Type头必须设置
       */
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editingUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        // JSON.stringify将JS对象转换为JSON字符串
        body: JSON.stringify(editForm)
      })
      const updatedUser = await response.json()
      // 更新用户列表中对应用户的数据
      // React学习要点：状态更新必须遵循不可变性原则
      // 不能直接修改：users[index] = updatedUser
      // 应该创建新数组：users.map(...)
      setUsers(users.map(user => user.id === editingUser ? updatedUser : user))
      setEditingUser(null)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingUser(null)
  }

  // 添加新用户
  const handleAddUser = async () => {
    try {
      /**
       * Fetch API POST请求示例
       *
       * React学习要点：
       * 1. POST请求用于创建新资源
       * 2. 请求体包含新资源的数据
       */
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserForm)
      })
      const newUser = await response.json()
      // 扩展运算符...创建新数组并添加新元素
      // React学习要点：数组操作要创建新数组而不是修改原数组
      setUsers([...users, newUser])
      // 重置表单
      setNewUserForm({ name: '', username: '', email: '' })
      setShowNewUserForm(false)
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  // 删除用户
  const handleDelete = async (userId) => {
    // 弹出确认框 - 原生浏览器API
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        /**
         * Fetch API DELETE请求示例
         *
         * React学习要点：
         * 1. DELETE请求用于删除资源
         * 2. 通常不需要请求体，只需URL中的资源ID
         */
        await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
          method: 'DELETE'
        })
        // filter方法返回满足条件的元素，创建新数组
        // React学习要点：不能直接修改状态数组，要创建新数组
        setUsers(users.filter(user => user.id !== userId))
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  /**
   * JSX渲染
   *
   * React学习要点：
   * 1. JSX是JavaScript的语法扩展，允许在JS中编写类HTML代码
   * 2. JSX中嵌入的JS表达式需要使用{}包裹
   * 3. className而不是class用于CSS类名（因为class是JS保留字）
   * 4. JSX中的注释需要使用大括号包裹星号语法
   */

  return (
    <div className="user-list">
      <h1>User Management</h1>
      
      {/* 搜索和筛选区域 */}
      <div className="search-filter">
        {/**
         * 受控组件（Controlled Component）
         *
         * React学习要点：
         * 1. 表单元素的值由React状态控制
         * 2. value属性绑定状态，onChange处理输入事件
         * 3. 每次输入都会调用setSearchTerm更新状态
         */}
        <input
          type="text"
          placeholder="Search by name or username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          {/* 条件类名：根据filterBy的值动态添加active类 */}
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
      </div>

      {/* 条件渲染：根据showNewUserForm状态显示不同内容 */}
      {showNewUserForm ? (
        /**
         * 新增用户表单
         *
         * React学习要点：
         * 1. 表单是受控组件，值由React状态管理
         * 2. 使用spread操作符...更新嵌套状态对象
         */
        <div className="new-user-form">
          <h2>Add New User</h2>
          <input
            type="text"
            placeholder="Name"
            value={newUserForm.name}
            onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            value={newUserForm.username}
            onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUserForm.email}
            onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
          />
          <div className="form-buttons">
            <button onClick={handleAddUser}>Add User</button>
            <button onClick={() => setShowNewUserForm(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="add-user-btn" onClick={() => setShowNewUserForm(true)}>
          Add New User
        </button>
      )}

      {/* 用户卡片列表 */}
      <div className="user-cards">
        {/**
         * 列表渲染
         *
         * React学习要点：
         * 1. 使用map方法遍历数组并渲染组件
         * 2. 每个列表项需要唯一的key属性，帮助React识别哪些元素改变了
         * 3. key应该使用稳定的唯一标识符，通常是数据库ID而不是数组索引
         */}
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            {/* 判断是否处于编辑模式 */}
            {editingUser === user.id ? (
              // 编辑模式下的表单
              <div className="edit-form">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
                <div className="form-buttons">
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              // 展示模式
              <>
                <h3>{user.name}</h3>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <div className="card-buttons">
                  {/**
                   * Link组件
                   *
                   * React Router学习要点：
                   * 1. Link替代<a>标签，实现客户端路由导航
                   * 2. to属性指定目标路径
                   * 3. 动态路由参数使用模板字符串传递
                   */}
                  <Link to={`/user/${user.id}`} className="view-btn">View Details</Link>
                  <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
