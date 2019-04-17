import { BookModule } from "../../models/book.js";
import { RandomChars } from "../../utils/common.js";
let bookModuel = new BookModule();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false,
    more:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotList =bookModuel.getHotList();
    hotList.then((res)=>{
      this.setData({
        books:res.data
      })
      // 
    })
  },
  /**
   * 点击搜索
   */
  onSearch(e){
    this.setData({
      searching:true
    })
  },
  /**
   * 取消搜索
   */
  onCancel(e){
    this.setData({
      searching: false
    })
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
    // console.log(123)
    this.setData({
      more: RandomChars(16)
    })
  },

  
})