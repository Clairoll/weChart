import { HTTP } from '../utils/http.js';
// 类名首字母必须大写
class LikeModuel extends HTTP {
  /**
   * 点赞接口
   * 参数一：like组件的状态
   * 参数二：对应的文章
   * 参数三：点赞类型
   */
  like(behaver,artID,category){
    let url = behaver=="like"? "like": "like/cancel";
    this.request({
      url: url,
      method: "POST",
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  /**
   * 因为加入了缓存，所以喜欢的状态需要新定义一个接口来即使更新
   */
  getClassicLikeStatus(artID,category,sCallBack){
    this.request({
      url: 'classic/'+category+'/'+artID+'/favor',
      success:sCallBack
    })
  }
}

export { LikeModuel }