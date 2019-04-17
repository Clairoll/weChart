// pages/book-detail/book-detail.js
import { BookModule } from "../../models/book.js";
import { LikeModuel } from "../../models/like.js";
let bookModuel = new BookModule();
let likeModuel = new LikeModuel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount:0,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 显示加载请求
    wx.showLoading({
      title: '页面正在加载，请稍后',
      icon:'none'
    })
    // 接收从book页面传递过来的参数
    const bid = options.bid;   
    const detail=bookModuel.getDetail(bid);
    const comments = bookModuel.getComments(bid);
    const likeStatus = bookModuel.getLikeStatus(bid);

    /**
     * 将三个Promise请求合并，进行统一监听，并以数组的形式进行返回，只有三个请求都结束才会执行后面的回调
     */
    Promise.all([detail, comments, likeStatus]).then(res => {
      // console.log(res)
      this.setData({
        book: res[0].data,
        comments: res[1].data.comments,
        likeStatus: res[2].data.like_status,
        likeCount:res[2].data.fav_nums
      })
      // 关闭页面加载动画
      wx.hideLoading()
    })
  },
  onLike(e){
    const like_or_cancel = e.detail.behaver;
    likeModuel.like(like_or_cancel,this.data.book.id,400)
  },
  onShowing(e){
   
    this.setData({
      show: true
    })
  },
  onCacel(e){
    this.setData({
      show: false
    })
  },
  onTap(e){
    const comment = e.detail.text||e.detail.value;
    if(!comment){
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return;
    }
    if(comment.lenght >12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return;
    }
    bookModuel.postComment(this.data.book.id,comment).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
    })

    this.data.comments.unshift({
      content:comment,
      nums:1
    })
    this.setData({
      comments:this.data.comments,
      show:false
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