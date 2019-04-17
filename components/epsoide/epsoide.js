// components/epsoide/epsoide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      /**
       * 此处定义为字符串而不是数字的原因是小程序官方会强制将数字08转化为8，所以只能定义为字符串
       */
      type: String,
      /**
       * observer函数在index的值被更改时会被触发
       */
      observer: function(newVal, oldVal, changePath) {
        /**
         * neawVal: 更新后的数据
         * oldVal：更新前的数据
         * changePath： 数据更新的来源
         */
        let val = newVal < 10 ? '0' + newVal : newVal;
        this.setData({
          /**
           * 如果此处是将index的值进行更改，则会再次出发observer函数，则会进入一个无限死循环，所以我们定义一个_index来进行接收更改后的数据
           */
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: 0,
    month: '',
    _index: ''
  },
  attached: function() {
    let data = new Date();
    this.setData({
      year: data.getFullYear(),
      month: this.data.months[data.getMonth()]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})