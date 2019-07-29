
var temp1 ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr :[],
     img : 'http://img.aonestep.com/group1/M00/00/02/rBISPFobigGAAW5OAABvOg70x6g113.jpg'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }

  ,
  upload: function(){
    var that = this
    var temp = ''
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://localhost:8073/file/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          formData: {
            "user": "test"
          },
          
      success: function (res) {
        temp = 'http:' + res.data.split(":")[2]
        console.log(temp,'temp')
       temp = res

       
            //do something
          }
        })
      },
    })
  
  },

  info: function(){
    var that = this
    let arr =[]
      wx.request({
        url: 'https://api.github.com/orgs/raywenderlich/members',
        success: function(res){
          console.log(res,'res')
         that.setData({
           arr: res.data
         })
        }
      })
  },

  makePhoneCall: function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  }
})