const CryptoJS = require('crypto-js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 加密密码
 */
const AESEncrypt = (data, key) => {
  let AES_KEY = CryptoJS.enc.Utf8.parse(key);
  let sendData = CryptoJS.enc.Utf8.parse(data);
  let encrypted = CryptoJS.AES.encrypt(sendData, AES_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

/**
 * 将对象转换为请求字符串  {a:1,b:2} => a=1&b=2
 */
const objToQuerystring = (obj) => {
  if (!isObject(obj)) {
    return
  }
  let querystring = ''
  for (let [key, value] of Object.entries(obj)) {
    querystring += `&${key}=${value}`
  }
  return querystring.substring(1)
}

/**
 * 将对象的属性添加search，后台需要  {a:1}=>{['search.a']:1}
 */
const objToSearchObj = (obj) => {
  if (!isObject(obj)) {
    return
  }
  let searchObj = {}
  for (let [key, value] of Object.entries(obj)) {
    searchObj[`search.${key}`] = value
  }
  return searchObj
}

//节流函数
const throttle = (func, interval = 250) => {
  let timeout;
  let startTime = new Date();
  return function (event) {
    clearTimeout(timeout);
    let curTime = new Date();
    if (curTime - startTime <= interval) {
      //小于规定时间间隔时，用setTimeout在指定时间后再执行
      timeout = setTimeout(() => {
        func.call(this, event);
      }, interval)
    } else {
      //重新计时并执行函数
      startTime = curTime;
      func.call(this, event);
    }
  }
}

module.exports = {
  formatTime,
  AESEncrypt,
  objToQuerystring,
  objToSearchObj,
  throttle
}