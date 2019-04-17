import{HTTP} from '../utils/http-p.js'
class KeywordModel extends HTTP{
  maxLength = 10; // 缓存中存入数组的最大长度
  key = 'q'; // 缓存数据的key
  /**
   * 历史搜索接口
   */
  getHistory(){
    const words = wx.getStorageSync(this.key);
    // 判断是否存在数组words
    if (!words){
      return [];
    }
    return words;
  }

  /**
   * 热门搜索接口
   */
  getHot(){
    return this.request({
      url:"/book/hot_keyword"
    })
  }

  /**
   * 将用户每次搜索记录写入缓存
   */
  addToHistory(keyword){
    let words = this.getHistory();
    // 判断缓存中是否存在用户当前输入的搜索内容
    let has = words.includes(keyword);    
    if(!has) {
      // 判断缓存中的数据是否 >=10
      if(words.length >= this.maxLength){
        // 删除数组末尾的元素
        words.pop();
      }
      // 当不存在时，将用户输入的数据添加进数组的第一个元素
      words.unshift(keyword);
      // 将数组存入缓存
      wx.setStorageSync(this.key, words);
    }

  }
}

export {KeywordModel}