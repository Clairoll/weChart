import {
  classicBeh
} from '../classic-beh.js';
const mMgr = wx.getBackgroundAudioManager();
console.log(mMgr);
Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached: function(e) {
    this._recoverStatus();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(e) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;
      } else {
        this.setData({
          playing:false
        })
        mMgr.pause();
      }
    },
    /**
     * 检测当前播放的音乐是否为当前页面的音乐
     */

    _recoverStatus: function() {
      // 判断当前页面是否在播放音乐
      if (mMgr.paused) { // 没有播放音乐
        this.setData({
          playing: false
        })
        return;
      } 
      // 判断当前播放音乐是否与当前页面显示的音乐一至
      if(mMgr.src == this.properties.src){
        this.setData({
          playing:true
        })
      }
    },
    /**
     *监听小程序自带的音乐播放控制器事件
     */
    _monitorSwitch:function(){
      // 播放
      mMgr.onPlay( ()=> {
        this._recoverStatus();
      })
      // 暂停
      mMgr.onPause(() => {
        this._recoverStatus();
      })
      // 结束
      mMgr.onStop(() => {
        this._recoverStatus();
      })
      // 音乐播放结束
      mMgr.onEnded(() => {
        this._recoverStatus();
      })
    }
  }
})