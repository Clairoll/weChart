import { ClassicModuel} from "../../models/classic.js";
import { LikeModuel } from "../../models/like.js";
let classicModuel = new ClassicModuel();
let likeModuel = new LikeModuel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classData:null,
    latest: true,
    first: false,
    likeStatus:false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    classicModuel.getLatest(res=>{
      // console.log(res);
      this.setData({
        classData: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
   
  },
  onLike:function(e){
    // console.log(e);
    let behaver = e.detail.behaver;  // 接收从子组件like传递过来的参数behaver
    likeModuel.like(behaver,this.data.classData.id,this.data.classData.type);
  },
  onNext:function(e){
   this._updataClassic('next');
  },
  onPrev:function(e){
    this._updataClassic('previous')
  },
  /**
  * 抽取获取前一期或者后一期的公共部分
  *  nextOrPrev:前一期（next）或者下一期（previous）
  */
  _updataClassic(nextOrPrev) {
    // 获取当前期刊的期号
    let index = this.data.classData.index;
    
    classicModuel.getClassic(index, nextOrPrev, (res) => {
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classData: res,
        first: classicModuel.isFirst(res.index),
        latest: classicModuel.isLatest(res.index)
      })
    })
  },
  _getLikeStatus(artID,category){
    likeModuel.getClassicLikeStatus(artID,category, (res)=>{
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
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