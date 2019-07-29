const regeneratorRuntime = require('./runtime.js')   //为什么在这里引入了还是不能用async，只能在每个页面中引入才行？
const LOGIN_COOKIE_NAME = 'cf81sessionid'
const BASE_URL = "http://localhost:5000"


function handleStatusCode(code) {
  switch (code) {
    case 401:
      wx.removeStorageSync('token')
      wx.showToast({
        title: "登录异常!",
        icon: 'none'
      })
      setTimeout(() => {
        wx.redirectTo({
          url: "/pages/login/login"
        })
      }, 1500)
      break;
    case 500:
      wx.showToast({
        title: "服务器异常!",
        icon: 'none'
      })
      break;
    default:
      { }
  }
}

function _json(url, param, method) {
  url = BASE_URL + url
  const token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data: param, //微信会自动去处理非字符串类型参数
      header: {
        'content-type': 'application/json',
        'Cookie': `${LOGIN_COOKIE_NAME}=${token}`
      },
      success(res) {
        handleStatusCode(res.statusCode)
        resolve(res.data)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}
const json = {
  get: function (url, param) {
    return _json(url, param, 'GET')
  },
  post: function (url, param) {
    return _json(url, param, 'POST')
  },
}

module.exports = json