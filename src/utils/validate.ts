/**
 * 是否外链
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }
  
  /**
   * 手机号码
   * @param {string} str
   * @returns {boolean}
   */
  export function isPhone(str) {
    const reg = /^1[3-9]\d{9}$/
    return reg.test(str)
  }
  
  /**
   * URL地址
   * @param {string} url
   * @returns {boolean}
   */
  export function isURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:\d+)*(\/($|[\w.,?'\\+&%$#=~-]+))*$/
    return reg.test(url)
  }
  
  /**
   * 小写字母
   * @param {string} str
   * @returns {boolean}
   */
  export function isLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  }
  
  /**
   * 大写字母
   * @param {string} str
   * @returns {boolean}
   */
  export function isUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  }
  
  /**
   * 字母
   * @param {string} str
   * @returns {boolean}
   */
  export function isAlphabets(str) {
    const reg = /^[A-Z]+$/i
    return reg.test(str)
  }
  
  /**
   * 邮箱
   * @param {string} email
   * @returns {boolean}
   */
  export function isEmail(email) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
    return reg.test(email)
  }
  
  /**
   * 数字
   * @param {*} val
   * @returns {boolean}
   */
  export function isNumber(val) {
    return typeof val === 'number'
  }
  
  /**
   * 中文
   * @param {string} str
   * @returns {boolean}
   */
  export function isChinese(str) {
    const reg = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
    return reg.test(str)
  }
  
  /**
   * 匹配中文汉字和标点
   * @param {string} str
   * @returns {boolean}
   */
  export function isMatchChinese(str) {
    const reg = /[\u4E00-\u9FA5|\u3002\uFF1F\uFF01\uFF0C\u3001\uFF1B\uFF1A\u201C\u201D\u2018\u2019\uFF08\uFF09\u300A\u300B\u3008\u3009\u3010\u3011\u300E\u300F\u300C\u300D\uFE43\uFE44\u3014\u3015\u2026\u2014\uFF5E\uFE4F\uFFE5]/
    return reg.test(str)
  }
  /**
   * empty function
   */
  export function NOOP() {}
  /**
   * false
   */
  export const NO = () => false
  export const objectToString = Object.prototype.toString
  export const toTypeString = value => objectToString.call(value)
  export const isArray = Array.isArray
  export const isMap = val => toTypeString(val) === '[object Map]'
  export const isSet = val => toTypeString(val) === '[object Set]'
  export const isDate = val => toTypeString(val) === '[object Date]'
  export const isRegExp = val => toTypeString(val) === '[object RegExp]'
  export const isFunction = val => typeof val === 'function'
  export const isString = val => typeof val === 'string'
  export const isSymbol = val => typeof val === 'symbol'
  export const isObject = val => val !== null && typeof val === 'object'
  export function isPromise(val) {
    return (
      (isObject(val) || isFunction(val))
      && isFunction((val).then)
      && isFunction((val).catch)
    )
  }
  export function kebabCase(word) {
    // 使用正则表达式匹配所有大写字母，并在前面加上短横线，然后转换为小写
    const newWord = word
      .replace(/[A-Z]/g, (match) => {
        return `-${match}`
      })
      .toLowerCase()
  
    return newWord
  }
  
  /**
   * Type guard to filter out null-ish values
   *
   * @category Guards
   * @example array.filter(notNullish)
   */
  export function notNullish(v) {
    return v != null
  }
  
  /**
   * Type guard to filter out null values
   *
   * @category Guards
   * @example array.filter(noNull)
   */
  export function noNull(v) {
    return v !== null
  }
  
  /**
   * Type guard to filter out null-ish values
   *
   * @category Guards
   * @example array.filter(notUndefined)
   */
  export function notUndefined(v) {
    return v !== undefined
  }
  
  /**
   * Type guard to filter out falsy values
   *
   * @category Guards
   * @example array.filter(isTruthy)
   */
  export function isTruthy(v) {
    return Boolean(v)
  }
  