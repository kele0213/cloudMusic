// components/musicControl/musicControl.js
const app = getApp()
const backgroundAudio = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    musicInfo:null,
    isPlay:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeState(){
      if(this.data.musicInfo){
        let isPlay = !this.data.isPlay
        wx.setStorageSync('isPlay', isPlay)
        if(isPlay){
          backgroundAudio.play()
        }else{
          backgroundAudio.pause()
        }
        this.setData({
          isPlay
        })
      }
    },
    pushToMusic(){
      if(this.data.musicInfo){
        wx.navigateTo({
          url: '/pages/music/music?id='+wx.getStorageSync('musicID'),
        })
      }
    }
  },
  pageLifetimes:{
    show(){
      let musicInfo = wx.getStorageSync('musicInfo')
      let isPlay = wx.getStorageSync('isPlay')
      if(musicInfo){
        this.setData({
          musicInfo,
          isPlay
        })
      }
    }
  }
})
