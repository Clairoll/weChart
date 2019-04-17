import {
  KeywordModel
} from '../../models/keyword.js';
import {
  BookModule
} from '../../models/book.js';
import {
  paginationBev
} from '../behaviors/paginationBev.js';
const keywordModel = new KeywordModel();
const bookModel = new BookModule();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    search: false,
    word: '',
    loadingCenter:false
  },
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.data.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      // 判断搜索框是否存在内容
      if (!this.data.word) {
        return;
      }
      // 判断当前用户是否正在加载数据
      if (this.isLocked()) {
        return;
      }
      if (this.hasMore()) {
        this.locked();
        this._showLoadingCenter();
        bookModel.search(this.getCurrentStart(), this.data.word).then(res => {
          this.setMoreData(res.data.books);
         
          this.unLocked();
          this._hideLoadingCenter();
        },()=>{
          // 请求失败的回调  
          this.unLocked();
        })
      }

    },
    /**
     * 点击取消，回到book-detail页面
     */
    onCancel(e) {
      this.initialize();
      this.triggerEvent('cancel', {}, {})
    },
    /**
     * 点击叉号取消搜索结果
     */
    onDelete() {
      this.initialize();
      this.setData({
        search: false,
        word:''
      })
    },
    /**
     * 搜索框输入完成事件
     */
    onConfirm(e) {
      this.setData({
        search: true
      })     
      // this.initialize();
      this._showLoadingCenter();
      /**
       * e.detail.value用户输入文本框的内容
       * e.detail.text用户点击标签获取的内容
       */
      const word = e.detail.value || e.detail.text;
      // 将用户点击或者输入内容显示在输入框
      this.setData({
        word: word
      })
      bookModel.search(0, word).then(res => {
        this.setMoreData(res.data.books);
        this.setTotal(res.data.total);
        keywordModel.addToHistory(word);
        this._hideLoadingCenter();
      })

    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})