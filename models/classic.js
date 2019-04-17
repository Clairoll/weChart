import {
  HTTP
} from '../utils/http.js';
class ClassicModuel extends HTTP {
  /**
   * 获取最新一期的期刊
   *  sCallBack： 回调函数，回传数据
   */
  getLatest(sCallback) {
    this.request({
      url: "/classic/latest",
      success: (res) => {
        sCallback(res);
        // 将最新一期的期刊号存储起来（最后一期）
        this._setLatestIndex(res.index);
        // 将获取到的数据加入缓存
        wx.setStorageSync(this._getKey(res.index), res);
      }
    })
  }
  /**
   * 获取所有我喜欢的期刊
   */
  getMyFavor(success) {
    const parmas ={
      url:'classic/favor',
      success:success
    }
    this.request(parmas);
  }
  /**
   * 获取当前期刊的前一期或者下一期期刊
   *  index：当前期刊的期号
   *  nextOrPrev：前一期（next）或者下一期（previous）
   *  sCallBack： 回调函数，回传数据
   */
  getClassic(index, nextOrPrev, sCallBack) {
    let key = nextOrPrev == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    // 从缓存中取出数据
    let classic = wx.getStorageSync(key);
    // 判断是否从缓存中取出了数据
    if(!classic){
      this.request({
        url: 'classic/' + index + '/' + nextOrPrev,
        success: (res) => {
           // 将获取到的数据加入缓存
          wx.setStorageSync(this._getKey(res.index), res)
          sCallBack(res);
        }
      })
    } else {
      sCallBack(classic);
    }
  }

  // 判断当前的期刊是不是第一期
  isFirst(index) {
    return index == 1 ? true : false;
  }

  // 判断当前期刊是不是最后一期
  isLatest(index) {
    // 获取最新一期的期刊号(最后一期)
    let latestIndex = this._getLaestIndex();
    return latestIndex == index ? true : false;
  }

  //设置数据缓存，将最后一期的期号存储起来
  _setLatestIndex(index) {
    // 同步的方式进行存储
    wx.setStorageSync('latest', index);
  }
  // 获取存储的最后一期期刊期号数据
  _getLaestIndex() {
    // 同步的方式进行获取
    let index = wx.getStorageSync('latest');
    return index;
  }

  // 为数据存储缓存设置key值
  _getKey(index) {
    return 'classic-' + index;
  }
}
export {
  ClassicModuel
}