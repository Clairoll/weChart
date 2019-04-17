import {
  HTTP
} from '../utils/http-p.js';

class BookModule extends HTTP{
  /**
   * 获取所有的热门书籍
   */
  getHotList(){
    return this.request({
      url: 'book/hot_list'
    })
  }

  /**
   * 搜索书籍接口
   *  start:开始条数，默认为0
   *  q:搜索内容
   */
  search(start,q){
    return this.request({
      url:'book/search?summary=1',
      data: {
        q:q,
        start:start
      }
    })
  }

  /**
   * 获取喜欢的书籍数量
   */
  getMyBookCount(){
    return this.request({
      url: 'book/favor/count'
    })
  }
  
  /**
   * 获取书籍的详细信息
   *  bid：对应书籍的id号
   */
  getDetail(bid) {
    return this.request({
      url:`book/${bid}/detail`
    })
  }

  /**
   * 获取当前书籍的点赞状态
   *  bid：对应书籍的id号
   */
  getLikeStatus(bid) {
    return this.request({
      url:'/book/' + bid + '/favor',
    })
  }

  /**
  * 获取当前书籍的短评信息
  *  bid：对应书籍的id号
  */
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  /**
   * 短评接口
   *  bid:对应书籍的id
   *  comment:评论内容
   */
  postComment(bid,comment){
    return this.request({
      url:'book/add/short_comment',
      method:"POST",
      data: {
        book_id:bid,
        content:comment
      }
    })
  }
}

export { BookModule}