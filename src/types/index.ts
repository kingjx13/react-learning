/**
 * 【TypeScript 类型定义文件】
 *
 * 本文件使用 TypeScript 接口定义了应用中使用的所有数据类型
 *
 * 【TypeScript 接口概念】
 * - 接口用于描述对象的具体结构
 * - 可以定义必填属性和可选属性（使用 ?）
 * - 可以嵌套定义复杂对象结构
 * - 接口只是类型约束，不会在编译后存在于 JavaScript 代码中
 *
 * 【TypeScript 类型推断】
 * - TypeScript 可以根据接口自动推断变量类型
 * - 这使得 IDE 能够提供代码补全和错误检查
 *
 * 【JSONPlaceholder API 数据结构】
 * 本项目使用 JSONPlaceholder 免费 REST API
 * 下面的类型定义对应其返回的用户数据结构
 */

/**
 * Address - 用户地址类型
 *
 * 【嵌套对象结构】
 * TypeScript 接口可以嵌套定义复杂对象
 * 下面的 geo 对象也是一个嵌套的接口结构
 */
export interface Address {
  /** 街道地址，如 "Kulas Light" */
  street: string;

  /** 套房/公寓号，如 "Apt. 556" */
  suite: string;

  /** 城市名称，如 "Gwenborough" */
  city: string;

  /** 邮政编码，如 "92998-3874" */
  zipcode: string;

  /** 地理坐标 */
  geo: {
    /** 纬度 */
    lat: string;
    /** 经度 */
    lng: string;
  };
}

/**
 * Company - 公司信息类型
 *
 * 【来自真实 API 的数据结构】
 * 这个结构对应 JSONPlaceholder API 返回的数据
 */
export interface Company {
  /** 公司名称，如 "Romaguera-Crona" */
  name: string;

  /** 公司口号/标语，如 "Multi-layered client-server neural-net" */
  catchPhrase: string;

  /** 业务领域/服务，如 "harness real-time e-markets" */
  bs: string;
}

/**
 * User - 用户完整信息类型
 *
 * 【React 中使用类型定义】
 * - 定义用户数据结构后，可以在组件、hooks、API 函数中使用
 * - 提供类型安全，避免运行时错误
 * - IDE 自动补全支持
 *
 * 【TypeScript 的 type 关键字】
 * - 除了 interface，还可以使用 type 来定义类型
 * - type 可以定义联合类型、交叉类型等复杂类型
 * - interface 更适合描述对象结构
 */
export interface User {
  /** 用户唯一标识符，数字类型 */
  id: number;

  /** 用户全名，如 "Leanne Graham" */
  name: string;

  /** 用户名，如 "Bret" */
  username: string;

  /** 电子邮件地址 */
  email: string;

  /** 用户地址信息，包含街道、城市、邮编等 */
  address: Address;

  /** 联系电话 */
  phone: string;

  /** 个人网站 URL */
  website: string;

  /** 用户所在公司信息 */
  company: Company;
}

/**
 * UserFormData - 用户表单完整数据类型
 *
 * 【表单数据结构】
 * 这个接口用于描述用户注册/编辑表单的完整数据结构
 * 包含了用户信息、地址信息和公司信息的组合
 *
 * 【与 User 接口的区别】
 * - User 来自 API，包含所有字段
 * - UserFormData 用于表单，可能只需要部分字段
 * - 表单数据不一定需要 id（创建时由 API 生成）
 */
export interface UserFormData {
  /** 用户全名 */
  name: string;

  /** 用户名 */
  username: string;

  /** 电子邮件 */
  email: string;

  /** 联系电话 */
  phone: string;

  /** 个人网站 */
  website: string;

  /** 街道地址 */
  street: string;

  /** 套房/公寓号 */
  suite: string;

  /** 城市 */
  city: string;

  /** 邮政编码 */
  zipcode: string;

  /** 公司名称 */
  companyName: string;

  /** 公司口号 */
  catchPhrase: string;

  /** 业务领域 */
  bs: string;
}

/**
 * SimpleUserFormData - 简化版用户表单数据类型
 *
 * 【TypeScript 可选属性】
 * - 使用必选属性可以减少表单复杂度
 * - 仅包含核心的用户信息字段
 * - 适合简单的 CRUD 操作
 *
 * 【接口组合】
 * 这个接口只包含 name、username、email 三个必填字段
 * 用于简化新用户创建和编辑的场景
 */
export interface SimpleUserFormData {
  /** 用户全名，必填 */
  name: string;

  /** 用户名，必填 */
  username: string;

  /** 电子邮件，必填 */
  email: string;
}

/**
 * ValidationErrors - 表单验证错误类型
 *
 * 【TypeScript 索引签名】
 * - {[key: string]: string | undefined} 表示可以有任意数量的字符串键
 * - 每个键对应一个错误消息字符串或 undefined
 * - 这允许动态添加任意字段的错误信息
 *
 * 【使用场景】
 * - 表单验证时，返回包含所有错误的对象
 * - 如果字段没有错误，该字段在对象中不存在或为 undefined
 * - 如果有错误，值为错误消息字符串
 */
export interface ValidationErrors {
  /** 姓名字段的错误信息，不存在表示无错误 */
  name?: string;

  /** 用户名字段的错误信息 */
  username?: string;

  /** 邮箱字段的错误信息 */
  email?: string;
}
