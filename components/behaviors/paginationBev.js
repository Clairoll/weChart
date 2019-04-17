/**
 * 定义行为组件方法
 */
const paginationBev = Behavior({
  data: {
    dataArray:[],
    total:null,
    noneResult:false,
    loading:false
  },
  methods: {
    /**
     * 将之前获取到的数据跟这次获取到的数据进行合并，并更新数据
     * dataArray:这次获取到的数据
     * this.data.dataArray:上次获取到的数据
     */
    setMoreData(dataArray){
      const temp = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray:temp
      })
    },
    /**
     * 获取目前所加载数据的总长度
     */
    getCurrentStart(){
      return this.data.dataArray.length;
    },
    /**
     * 设置目前获取的数据总数
     */
    setTotal(total){
      this.data.total = total;
      if(total==0) {
        this.setData({
          noneResult:true
        })
      }
    },
    /**
     * 判断是否还需在发送请求获取剩余数据
     */
    hasMore(){
      if (this.data.dataArray.length >= this.data.total) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * 每次搜索前都需要将上一次的搜索结果置空
     */
    initialize(){
      this.setData({
        dataArray:[],
        noneResult:false,
        loading:false
      })
      this.data.total=null;
    },
    /**
     * 判断是否上锁，即是否正在请求数据
     */
    isLocked(){
      return this.data.loading ? true : false
    },
    /**
     * 上锁，即设置为正在请求数据
     */
    locked(){
      this.setData({
        loading:true
      })
    },
    /**
     * 解锁,即设置为非数据请求状态
     */
    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
})
export { paginationBev}