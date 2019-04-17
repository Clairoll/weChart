// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * 也可以称之为定义对外开放的数据
   */
  properties: {
    like: {
      // 类型
      //默认值为false
      type: Boolean,
      //初始值
      value: false,
    },
    count: {
      //默认值为0
      type: Number
    },
    readOnly:{
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   * 定义在组建内部的数据，一般不对外开放
   */
  data: {
    yes_src: 'images/like.png',
    no_src: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      // 判断like组件是不是只读的，也就是不能点击
      if(this.properties.readOnly) {
        return;
      }

      let like = this.properties.like;
      let count = this.properties.count;

      count = like ? count - 1 : count + 1;
      // 使用this.setData来更新页面的数据
      this.setData({
        count: count,
        like: !like
      })

      // 自定义事件
      let behaver = this.properties.like? "like" : "cancer";
      // 激活自定义事件第一个参数为自定义事件的名称，第二个参数为自定义事件，第三个参数为系统参数
      this.triggerEvent("like", { 
        behaver: behaver
        },{});
    }
  }
})