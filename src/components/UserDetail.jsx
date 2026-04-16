/**
 * React Router Hooks导入说明：
 * - useParams: 用于获取URL中的动态参数
 * - Link: 用于创建客户端导航链接
 *
 * React Router学习要点：
 * 1. useParams在React Router v5中称为useParams，在v6中也是useParams
 * 2. useParams返回一个对象，键是路由中定义的动态参数名
 * 3. Link组件替代<a>标签实现客户端路由，避免页面刷新
 */

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

/**
 * UserDetail组件 - 用户详情页面
 *
 * React学习要点：
 * 1. 组件可以接收props（这里使用useParams获取路由参数）
 * 2. 组件可以有自己的内部状态
 * 3. 组件在挂载和更新时会触发重新渲染
 */

const UserDetail = () => {
  /**
   * useParams Hook 使用说明
   *
   * React Router学习要点：
   * 1. useParams用于获取URL中的动态参数
   * 2. 在Route中定义路径参数（如 /user/:id），通过useParams获取
   * 3. 返回的对象键是参数名（如 { id: "1" }）
   */

  // 从URL参数中获取用户ID
  const { id } = useParams()

  /**
   * useState Hook 使用说明
   *
   * 语法：const [state, setState] = useState(initialValue)
   *
   * - state: 当前状态值
   * - setState: 更新状态的函数
   * - initialValue: 状态的初始值
   */

  // 用户详情数据
  const [user, setUser] = useState(null)
  // 加载状态 - 用于显示加载指示器
  const [loading, setLoading] = useState(true)

  /**
   * useEffect Hook 使用说明
   *
   * 语法：useEffect(effectFunction, dependencyArray)
   *
   * React学习要点：
   * 1. 依赖数组中的值变化时，effect会重新执行
   * 2. 这里依赖是id，所以当id变化时会重新获取用户数据
   * 3. 这在动态路由中很重要，用户可能在详情页之间切换
   */

  // 当用户ID变化时，重新获取用户详情
  useEffect(() => {
    fetchUserDetail()
  }, [id])

  /**
   * 异步数据获取函数
   *
   * React学习要点：
   * 1. 使用async/await处理异步操作
   * 2. API调用在try/catch块中处理可能的错误
   * 3. 状态更新函数（setLoading, setUser）触发组件重新渲染
   */

  // 从API获取单个用户的详细信息
  const fetchUserDetail = async () => {
    try {
      setLoading(true)
      // 使用模板字符串将用户ID嵌入URL
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const data = await response.json()
      setUser(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user details:', error)
      setLoading(false)
    }
  }

  /**
   * 早期返回（Early Return）
   *
   * React学习要点：
   * 1. 在组件顶部进行条件判断，可以避免深层嵌套
   * 2. 加载状态和错误状态通常使用早期返回处理
   * 3. 这是一种常见的React组件模式
   */

  // 加载中的显示状态
  if (loading) {
    return <div className="loading">Loading...</div>
  }

  // 用户不存在的显示状态
  if (!user) {
    return <div className="error">User not found</div>
  }

  /**
   * JSX渲染
   *
   * React学习要点：
   * 1. JSX中的{}用于嵌入JavaScript表达式
   * 2. 访问嵌套对象属性（如 user.address.street）是常见的操作
   * 3. 组件可以包含多个子元素分组（如用<div>包裹相关元素）
   */

  return (
    <div className="user-detail">
      {/**
       * Link组件
       *
       * React Router学习要点：
       * 1. Link替代<a>标签进行客户端导航
       * 2. to属性指定目标路径
       * 3. 点击Link不会触发页面刷新，React Router处理导航
       */}
      <Link to="/" className="back-btn">Back to List</Link>
      <h1>User Details</h1>
      <div className="detail-card">
        {/* 基本信息 */}
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        
        {/* 地址信息 - 嵌套对象访问 */}
        <div className="address">
          <h3>Address</h3>
          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>Suite:</strong> {user.address.suite}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
          {/**
           * 更深层次的嵌套对象访问
           *
           * React学习要点：
           * 1. 可以访问任意深度的嵌套对象
           * 2. 实际开发中应注意空值检查，避免访问null或undefined的属性
           */}
          <p><strong>Geo:</strong> Lat {user.address.geo.lat}, Lng {user.address.geo.lng}</p>
        </div>
        
        {/* 公司信息 */}
        <div className="company">
          <h3>Company</h3>
          <p><strong>Name:</strong> {user.company.name}</p>
          <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
          <p><strong>BS:</strong> {user.company.bs}</p>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
