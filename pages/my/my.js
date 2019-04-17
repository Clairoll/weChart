import { BookModule} from '../../models/book.js';
import { ClassicModuel} from '../../models/classic.js';
const bookModule = new BookModule();
const classicModule = new ClassicModuel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    bookCount:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },
  /**
   * 判断用户是否授权
   */
  userAuthorized(){
    wx.getSetting({
      success:data=>{
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:data=>{
              this.setData({
                authorized:true,
                userInfo:data.userInfo
              })
            }
          })
        } 
      }
    })
  },
  /**
   * 获取喜欢的书籍数量
   */
  getMyBookCount(){
    bookModule.getMyBookCount().then(res=> {
      this.setData({
        bookCount: res.data.count
      })
    })
  },
  /**
   * 获取所有用户喜欢的期刊
   */
  getMyFavor(){
    classicModule.getMyFavor(res=> {
      this.setData({
        classics:res
      })
    })
  },

  /**
   * 点击授权
   */
  onGetUserInfo(e){
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        authorized: true
      })
    }
    
  },
  /**
   * 点击跳转到另外一个页面
   */
  onJumpToAbout(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
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
})