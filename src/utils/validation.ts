/**
 * 【表单验证工具函数】
 *
 * 本文件包含用户表单数据的验证逻辑
 *
 * 【为什么需要验证？】
 * - 确保用户输入的数据格式正确
 * - 在发送 API 请求前提前发现错误
 * - 提供更好的用户体验
 *
 * 【验证策略】
 * - 客户端验证：用户输入时即时反馈
 * - 优点：响应快，用户体验好
 * - 缺点：可以被绕过，不能替代服务端验证
 */

/**
 * validateUserForm - 验证用户表单数据
 *
 * 【函数设计原则】
 * - 返回错误对象而不是抛出异常
 * - 可以一次性返回所有错误
 * - 便于 UI 显示所有错误信息
 *
 * 【参数】
 * - formData: SimpleUserFormData - 表单数据对象
 * - 包含 name、username、email 三个字段
 *
 * 【返回值】
 * - ValidationErrors - 错误对象
 * - 如果字段有错误，键为字段名，值为错误消息
 * - 如果验证通过，返回空对象 {}
 *
 * @param formData - 要验证的表单数据
 * @returns 验证错误对象
 */
export const validateUserForm = (formData: SimpleUserFormData): ValidationErrors => {
  /**
   * 【初始化错误对象】
   * - 使用 const 声明，因为对象会被修改
   * - 初始为空对象，没有任何错误
   */
  const errors: ValidationErrors = {};

  /**
   * 【姓名验证】
   *
   * 【验证条件】
   * - 必须存在（不是 null/undefined）
   * - 不能是空字符串
   * - trim() 去除首尾空格后不能为空
   *
   * 【trim() 方法】
   * - 去除字符串首尾的空白字符
   * - 防止用户只输入空格
   */
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  }

  /**
   * 【用户名验证】
   * - 与姓名验证逻辑相同
   * - 检查是否存在且不为空
   */
  if (!formData.username || formData.username.trim() === '') {
    errors.username = 'Username is required';
  }

  /**
   * 【邮箱验证】
   *
   * 【双重验证】
   * - 第一层：检查是否存在且不为空
   * - 第二层：检查格式是否正确
   *
   * 【正则表达式】
   * - /^[^@]+@[^@]+\.[^@]+$/
   * - /^[^@]+/ - @ 之前的字符（至少一个）
   * - /@[^@]+/ - @ 和最后一个 . 之间的字符
   * - /\.[^@]+$/ - 最后一个 . 之后的字符
   *
   * 【正则表达式.test()】
   * - test() 方法检查字符串是否匹配模式
   * - 返回 true 或 false
   */
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  /**
   * 【返回错误对象】
   * - 如果有错误，errors 对象包含相应的键值对
   * - 如果没有错误，errors 是空对象
   */
  return errors;
};
